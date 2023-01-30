import type { ConnectorMetadata } from '@logto/connector-kit';
import { ConnectorPlatform } from '@logto/connector-kit';

export const defaultMetadata: ConnectorMetadata = {
  id: 'saml',
  target: 'saml',
  platform: ConnectorPlatform.Universal,
  name: {
    en: 'SAML',
    'zh-CN': 'SAML',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: 'SAML is an XML based framework that stands for Security Assertion Markup Language. It can be used for authentication.',
    'zh-CN':
      '安全断言标记语言 SAML 是一个基于 XML 的开源标准数据格式，它可用于在当事方之间交换身份验证和授权数据。',
  },
  readme: './README.md',
  configTemplate: './docs/config-template.json',
  isStandard: true,
};

export const defaultTimeout = 10_000;

export const authnRequestBinding = ['HTTP-Redirect'] as const;

export const assertionBinding = ['HTTP-POST'] as const;

export const messageSigningOrders = ['sign-then-encrypt', 'encrypt-then-sign'] as const;
