'use strict';
// Rewrite S3 virtual-hosted URLs to path-style at the HTTP transport layer.
// Module-level patching misses CDK's nested @aws-sdk/client-s3 copy; patching
// Node's built-in http module affects all code in the process.
if (!process.env.AWS_ENDPOINT_URL) return;

const http = require('http');
const { URL } = require('url');

const baseName = new URL(process.env.AWS_ENDPOINT_URL).hostname; // "localhost.localstack.cloud"
const suffix   = '.' + baseName;                                  // ".localhost.localstack.cloud"

function rewrite(options) {
  if (!options || typeof options !== 'object') return options;
  const rawHost = options.hostname || (options.host || '').replace(/:\d+$/, '');
  if (!rawHost || rawHost === baseName || !rawHost.endsWith(suffix)) return options;
  const bucket = rawHost.slice(0, rawHost.length - suffix.length);
  return {
    ...options,
    hostname: baseName,
    host: options.host ? options.host.replace(rawHost, baseName) : undefined,
    path: '/' + bucket + (options.path || '/'),
  };
}

const origRequest = http.request.bind(http);
http.request = (options, callback) => origRequest(rewrite(options), callback);

const origGet = http.get.bind(http);
http.get = (options, callback) => origGet(rewrite(options), callback);
