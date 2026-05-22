#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { OptimumUStack } from '../lib/stack';

const app = new cdk.App();

new OptimumUStack(app, 'OptimumUStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT ?? '000000000000',
    region: process.env.CDK_DEFAULT_REGION ?? 'us-east-1',
  },
});
