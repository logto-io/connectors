import type { BinaryToTextEncoding } from 'crypto';
import crypto from 'crypto';

import got from 'got';

import type { TencentErrorResponse, TencentSuccessResponse } from '@/types';
import { tencentErrorResponse } from '@/types';

import { endpoint } from './constant';

function sha256Hmac(message: string, secret: string): string;
function sha256Hmac(message: string, secret: string, encoding: BinaryToTextEncoding): Buffer;

function sha256Hmac(message: string, secret: string, encoding?: BinaryToTextEncoding) {
  const hmac = crypto.createHmac('sha256', secret);

  return encoding ? hmac.update(message).digest(encoding) : hmac.update(message).digest();
}

function getHash(message: string, encoding: BinaryToTextEncoding = 'hex') {
  const hash = crypto.createHash('sha256');

  return hash.update(message).digest(encoding);
}

function getDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth().toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function isErrorResponse(response: unknown): response is TencentErrorResponse {
  const result = tencentErrorResponse.safeParse(response);

  return result.success;
}

export function request(
  parameters: {
    fromEmailAddress: string;
    replyAddress: string;
    destination: string;
    template: {
      templateId: string;
      templateData: string;
    };
    subject: string;
  },
  config: {
    secretId: string;
    secretKey: string;
    region: string;
  }
) {
  const { secretId, secretKey, region } = config;
  const timestamp = Math.floor(Date.now() / 1000);
  const date = getDate(timestamp);
  const service = 'ses';

  const firstPayload = {
    FromEmailAddress: parameters.fromEmailAddress,
    ReplyToAddresses: parameters.replyAddress,
    Destination: [parameters.destination],
    Template: {
      TemplateID: Number(parameters.template.templateId),
      TemplateData: parameters.template.templateData,
    },
    Subject: parameters.subject,
  };

  const payload = JSON.stringify(firstPayload);

  const hashedRequestPayload = getHash(payload);
  const signedHeaders = 'content-type;host';
  const httpRequestMethod = 'POST';
  const canonicalUri = '/';
  const canonicalQueryString = '';
  const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${endpoint}\n`;

  const canonicalRequest = [
    httpRequestMethod,
    canonicalUri,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    hashedRequestPayload,
  ].join('\n');

  const algorithm = 'TC3-HMAC-SHA256';
  const hashedCanonicalRequest = getHash(canonicalRequest);
  const credentialScope = `${date}/${service}/tc3_request`;
  const stringToSign = [algorithm, timestamp, credentialScope, hashedCanonicalRequest].join('\n');

  const secretDate = sha256Hmac(date, `TC3${secretKey}`);
  const secretService = sha256Hmac(service, secretDate);
  const secretSigning = sha256Hmac('tc3_request', secretService);
  const signature = sha256Hmac(stringToSign, secretSigning, 'hex').toString();
  const credential = `${secretId}/${credentialScope}`;

  const authorization = [
    algorithm,
    `Credential=${credential},`,
    `SignedHeaders=${signedHeaders},`,
    `Signature=${signature}`,
  ].join(' ');

  return got.post<TencentErrorResponse | TencentSuccessResponse>(`https://${endpoint}`, {
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json; charset=utf-8',
      Host: endpoint,
      'X-TC-Action': 'SendEmail',
      'X-TC-Timestamp': String(timestamp),
      'X-TC-Version': '2020-10-02',
      'X-TC-Region': region,
    },
    body: payload,
    responseType: 'json',
  });
}
