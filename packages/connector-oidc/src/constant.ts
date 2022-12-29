import type { ConnectorMetadata } from '@logto/connector-kit';
import { ConnectorPlatform } from '@logto/connector-kit';

import { endpointConfigGuard } from './types';

export const defaultMetadata: ConnectorMetadata = {
  id: 'oidc',
  target: 'oidc',
  platform: ConnectorPlatform.Universal,
  name: {
    en: 'OIDC',
    'zh-CN': 'OIDC',
  },
  logo: './logo.svg',
  logoDark: './logo-dark.svg',
  description: {
    en: 'OpenID Connect 1.0 is a simple identity layer on top of the OAuth 2.0 protocol.',
    'zh-CN': 'OpenID Connect 1.0 是基于 OAuth 2.0 协议的一个简单身份层。',
  },
  readme: './README.md',
  configTemplate: './docs/config-template.json',
  isStandard: true,
};

export const defaultTimeout = 5000;

export const oauthConfigGlobalKeys = Object.freeze([
  'oidcFlowType',
  'idTokenVerificationConfig',
  ...endpointConfigGuard.keyof().options,
] as const);
