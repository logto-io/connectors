import type { ConnectorMetadata } from '@logto/connector-kit';
import { ConnectorPlatform } from '@logto/connector-kit';

export const defaultMetadata: ConnectorMetadata = {
  id: 'oauth2',
  target: 'oauth2',
  platform: ConnectorPlatform.Universal,
  name: {
    en: 'OAuth 2.0',
    'zh-CN': 'OAuth 2.0',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: 'The OAuth 2.0 authorization framework enables a third-party application to obtain limited access to an HTTP service.',
    'zh-CN': 'OAuth 2.0 授权框架是的第三方应用能够有权限访问 HTTP 服务。',
  },
  readme: './README.md',
  configTemplate: './docs/config-template.json',
  isStandard: true,
};

export const defaultTimeout = 5000;

export const oauthConfigGlobalKeys = Object.freeze([
  'oauthGrantType',
  'authorizationEndpoint',
  'tokenEndpoint',
  'userInfoEndpoint',
] as const);
