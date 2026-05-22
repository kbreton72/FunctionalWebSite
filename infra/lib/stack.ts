import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { Construct } from 'constructs';

export class OptimumUStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Must be declared before any conditional use below
    const isLocal = process.env.CDK_DEFAULT_ACCOUNT === '000000000000';

    const bucketName: string = this.node.tryGetContext('bucketName') ?? 'optimumu-site';
    // Local: optimumu.localhost (no cert required — LocalStack auto-validates ACM + Route53)
    // Production: optimumu.life (requires ACM cert in us-east-1 + DNS validation)
    const localDomain: string | undefined = this.node.tryGetContext('localDomain') || undefined;
    const domainName: string | undefined = this.node.tryGetContext('domainName') || undefined;
    const hostedZoneId: string | undefined = this.node.tryGetContext('hostedZoneId') || undefined;
    const activeDomain = isLocal ? localDomain : domainName;

    // ── GitHub auth ───────────────────────────────────────────────────────────
    // Replace with AWS CodeConnections before first production deploy — see CLAUDE.md
    if (!isLocal) {
      new codebuild.GitHubSourceCredentials(this, 'GitHubCreds', {
        accessToken: cdk.SecretValue.unsafePlainText(process.env.GITHUB_TOKEN ?? ''),
      });
    }

    // ── S3 ────────────────────────────────────────────────────────────────────
    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName,
      blockPublicAccess: isLocal ? undefined : s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      // LocalStack deletes non-empty buckets without help; custom Lambda causes DELETE_FAILED
      autoDeleteObjects: !isLocal,
      // Local: S3 website hosting resolves /blog → /blog/index.html natively,
      // since LocalStack does not execute CloudFront Functions.
      // Production: CloudFront Function handles path rewriting instead.
      ...(isLocal && {
        websiteIndexDocument: 'index.html',
        websiteErrorDocument: '404.html',
      }),
    });

    // Local only: OAI signing isn't fully emulated by LocalStack; public read avoids 403s
    if (isLocal) {
      siteBucket.addToResourcePolicy(new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [`${siteBucket.bucketArn}/*`],
        principals: [new iam.AnyPrincipal()],
      }));
    }

    // ── Route53 + ACM Certificate ─────────────────────────────────────────────
    // Local:      create a new hosted zone for optimumu.localhost; LocalStack
    //             emulates Route53 + ACM and auto-validates the cert.
    // Prod+R53:   import existing hosted zone (hostedZoneId in cdk.json);
    //             CDK writes the validation CNAME automatically.
    // Prod+extDNS: cert only; manually add the CNAME validation record at your
    //             registrar before traffic can route. Stack deploy will hang at
    //             cert creation until validation completes.
    // NOTE: stack must deploy to us-east-1 — CloudFront requires certs in that region.
    let certificate: acm.ICertificate | undefined;
    let hostedZone: route53.IHostedZone | undefined;

    if (isLocal && localDomain) {
      const localZone = new route53.HostedZone(this, 'HostedZone', {
        zoneName: localDomain,
      });
      certificate = new acm.Certificate(this, 'Certificate', {
        domainName: localDomain,
        validation: acm.CertificateValidation.fromDns(localZone),
      });
      hostedZone = localZone;
    } else if (!isLocal && domainName) {
      if (hostedZoneId) {
        hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
          hostedZoneId,
          zoneName: domainName,
        });
        certificate = new acm.Certificate(this, 'Certificate', {
          domainName,
          subjectAlternativeNames: [`www.${domainName}`],
          validation: acm.CertificateValidation.fromDns(hostedZone),
        });
      } else {
        certificate = new acm.Certificate(this, 'Certificate', {
          domainName,
          subjectAlternativeNames: [`www.${domainName}`],
          validation: acm.CertificateValidation.fromDns(),
        });
      }
    }

    // ── CloudFront Function — path rewriter ───────────────────────────────────
    // Rewrites clean URLs to S3 keys: /blog → /blog/index.html
    // Needed because S3 OAI origin does not serve index documents for subdirs.
    const urlRewriteFn = new cloudfront.Function(this, 'UrlRewriteFunction', {
      code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
  var uri = event.request.uri;
  if (uri.endsWith('/')) {
    event.request.uri += 'index.html';
  } else if (!uri.split('/').pop().includes('.')) {
    event.request.uri += '/index.html';
  }
  return event.request;
}
      `),
      runtime: cloudfront.FunctionRuntime.JS_2_0,
    });

    // ── CloudFront ─────────────────────────────────────────────────────────────
    // Production: OAI restricts S3 to CloudFront-only access.
    // Local: OAI signing not fully emulated by LocalStack; use public bucket instead.
    const oai = isLocal ? undefined : new cloudfront.OriginAccessIdentity(this, 'OAI');
    if (oai) siteBucket.grantRead(oai);

    const s3Origin = isLocal
      ? new origins.S3Origin(siteBucket)
      : new origins.S3Origin(siteBucket, { originAccessIdentity: oai });

    const domainNames = activeDomain
      ? isLocal
        ? [activeDomain]
        : [activeDomain, `www.${activeDomain}`]
      : undefined;

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: s3Origin,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        functionAssociations: [{
          function: urlRewriteFn,
          eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
        }],
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
        },
      ],
      ...(certificate && domainNames ? { domainNames, certificate } : {}),
    });

    // ── Route53 DNS records ───────────────────────────────────────────────────
    // Local:   single A alias record for optimumu.localhost → CloudFront distribution.
    //          LocalStack DNS resolves this for in-container requests.
    //          Browser access from host uses OS .localhost resolution → 127.0.0.1:80.
    // Prod+R53: A alias records for apex + www.
    if (hostedZone && activeDomain) {
      const aliasTarget = route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(distribution),
      );
      new route53.ARecord(this, 'AliasRecord', {
        zone: hostedZone,
        target: aliasTarget,
      });
      if (!isLocal) {
        new route53.ARecord(this, 'WwwAliasRecord', {
          zone: hostedZone,
          recordName: `www.${activeDomain}`,
          target: aliasTarget,
        });
      }
    }

    // ── CodeBuild ──────────────────────────────────────────────────────────────
    const buildProject = new codebuild.Project(this, 'BuildProject', {
      projectName: 'optimumu-build',
      ...(!isLocal && {
        source: codebuild.Source.gitHub({ owner: 'kbreton72', repo: 'FunctionalWebSite', webhook: false }),
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_7_0,
        environmentVariables: {
          BUCKET_NAME: { value: siteBucket.bucketName },
          DISTRIBUTION_ID: { value: distribution.distributionId },
        },
      },
      buildSpec: codebuild.BuildSpec.fromObject(
        isLocal
          ? {
              version: '0.2',
              phases: {
                install: { commands: ['cd /workspace && npm ci'] },
                build: { commands: ['cd /workspace && npm run build --workspace=web'] },
                post_build: {
                  commands: [
                    'awslocal s3 sync /tmp/astro-dist/ s3://$BUCKET_NAME --delete',
                    'awslocal cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"',
                  ],
                },
              },
            }
          : {
              version: '0.2',
              phases: {
                install: {
                  'runtime-versions': { nodejs: '22' },
                  commands: ['npm ci'],
                },
                build: { commands: ['npm run build --workspace=web'] },
                post_build: {
                  commands: [
                    'aws s3 sync /tmp/astro-dist/ s3://$BUCKET_NAME --delete',
                    'aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"',
                  ],
                },
              },
            }
      ),
    });

    siteBucket.grantReadWrite(buildProject);
    buildProject.addToRolePolicy(new iam.PolicyStatement({
      actions: ['cloudfront:CreateInvalidation'],
      resources: [
        `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
      ],
    }));

    // ── Webhook Lambda ─────────────────────────────────────────────────────────
    // Local: hot-reload from mounted workspace via LocalStack's special hot-reload
    //   bucket. Run `npm run dev:lambda` to keep dist/ rebuilt on source changes.
    //   LocalStack watches /workspace/infra/lib/webhook-lambda/dist and reloads
    //   automatically when dist/index.js changes.
    // Production: NodejsFunction bundles via esbuild at synth time.
    const lambdaEnv = {
      SANITY_WEBHOOK_SECRET: process.env.SANITY_WEBHOOK_SECRET ?? '',
      CODEBUILD_PROJECT_NAME: buildProject.projectName,
    };
    const webhookFn: lambda.Function = isLocal
      ? new lambda.Function(this, 'WebhookFn', {
          runtime: lambda.Runtime.NODEJS_22_X,
          handler: 'index.handler',
          code: lambda.Code.fromBucket(
            s3.Bucket.fromBucketName(this, 'HotReloadBucket', 'hot-reload'),
            '/workspace/infra/lib/webhook-lambda/dist',
          ),
          timeout: cdk.Duration.seconds(30),
          environment: lambdaEnv,
        })
      : new NodejsFunction(this, 'WebhookFn', {
          entry: path.join(__dirname, 'webhook-lambda/index.ts'),
          handler: 'handler',
          runtime: lambda.Runtime.NODEJS_22_X,
          timeout: cdk.Duration.seconds(30),
          environment: lambdaEnv,
        });

    webhookFn.addToRolePolicy(new iam.PolicyStatement({
      actions: ['codebuild:StartBuild'],
      resources: [buildProject.projectArn],
    }));

    // ── API Gateway ────────────────────────────────────────────────────────────
    const httpApi = new apigatewayv2.HttpApi(this, 'WebhookApi', {
      apiName: 'optimumu-webhook',
    });

    httpApi.addRoutes({
      path: '/webhook',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration('WebhookIntegration', webhookFn),
    });

    // ── Outputs ────────────────────────────────────────────────────────────────
    new cdk.CfnOutput(this, 'BucketName', { value: siteBucket.bucketName });
    new cdk.CfnOutput(this, 'DistributionDomain', { value: distribution.distributionDomainName });
    new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });
    new cdk.CfnOutput(this, 'WebhookEndpoint', {
      value: `${httpApi.apiEndpoint}/webhook`,
    });
    if (activeDomain) {
      new cdk.CfnOutput(this, 'SiteUrl', {
        value: isLocal ? `http://${activeDomain}` : `https://${activeDomain}`,
      });
    }
  }
}
