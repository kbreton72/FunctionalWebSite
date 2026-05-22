import { createHmac, timingSafeEqual } from 'crypto';
import { CodeBuildClient, StartBuildCommand } from '@aws-sdk/client-codebuild';

const codebuildClient = new CodeBuildClient({
  region: process.env.AWS_REGION ?? 'us-east-1',
  // AWS_ENDPOINT_URL is picked up automatically by the SDK when set
});

function verifySignature(body: string, header: string, secret: string): boolean {
  // Sanity format: v1,t=<unix_ts>,v1=<hex_hmac_sha256>
  const match = header.match(/^v1,t=(\d+),v1=([a-f0-9]+)$/);
  if (!match) return false;
  const [, timestamp, receivedHex] = match;

  const expected = createHmac('sha256', secret)
    .update(`${timestamp}.${body}`)
    .digest('hex');

  try {
    return timingSafeEqual(
      Buffer.from(receivedHex, 'hex'),
      Buffer.from(expected, 'hex'),
    );
  } catch {
    return false;
  }
}

export const handler = async (event: any): Promise<any> => {
  const signature: string = event.headers?.['sanity-webhook-signature'] ?? '';
  const body: string = typeof event.body === 'string' ? event.body : JSON.stringify(event.body ?? {});
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  const projectName = process.env.CODEBUILD_PROJECT_NAME;

  if (!secret || !projectName) {
    console.error('Missing required environment variables');
    return { statusCode: 500, body: 'Server misconfiguration' };
  }

  if (!verifySignature(body, signature, secret)) {
    console.warn('Webhook signature verification failed');
    return { statusCode: 401, body: 'Invalid signature' };
  }

  try {
    const result = await codebuildClient.send(
      new StartBuildCommand({ projectName }),
    );
    console.log('Build started:', result.build?.id);
    return { statusCode: 200, body: JSON.stringify({ buildId: result.build?.id }) };
  } catch (err) {
    console.error('Failed to start build:', err);
    return { statusCode: 500, body: 'Failed to trigger build' };
  }
};
