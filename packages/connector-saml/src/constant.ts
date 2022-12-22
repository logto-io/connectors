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

export const signingAlgorithms = ['RSA_SHA1', 'RSA_SHA256', 'RSA_SHA512'] as const;

export const signingAlgorithmMapping = (signingAlgorithm: string): string => {
  switch (signingAlgorithm) {
    case 'RSA_SHA1':
      return 'http://www.w3.org/2000/09/xmldsig#rsa-sha1';
    case 'RSA_SHA512':
      return 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha512';
    // eslint-disable-next-line unicorn/no-useless-switch-case
    case 'RSA_SHA256':
    default:
      return 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256';
  }
};

export const authnRequestBinding = ['HTTP-Redirect'] as const;

export const assertionBinding = ['HTTP-POST'] as const;

export const messageSigningOrders = ['sign-then-encrypt', 'encrypt-then-sign'] as const;
