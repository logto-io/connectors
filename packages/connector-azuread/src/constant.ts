import { ConnectorMetadata, ConnectorPlatform } from '@logto/connector-kit';

export const graphAPIEndpoint = 'https://graph.microsoft.com/v1.0/me';
export const scopes = ['User.Read'];

export const defaultMetadata: ConnectorMetadata = {
  id: 'azuread-universal',
  target: 'azuread',
  platform: ConnectorPlatform.Universal,
  name: {
    en: 'Azure Active Directory',
    'zh-CN': 'Azure Active Directory',
    'tr-TR': 'Azure Active Directory',
    'ko-KR': 'Azure Active Directory',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: 'Azure Active Directory is a leading AD provider.',
    'zh-CN': 'Azure Active Directory 是领先的 AD 服务提供商。',
    'tr-TR': 'Azure Active Directory en büyük AD servisidir.', // UNTRANSLATED
    'ko-KR': 'Azure Active Directory is the biggest AD provider.', // UNTRANSLATED
  },
  readme: './README.md',
  configTemplate: './docs/config-template.json',
};

export const defaultTimeout = 5000;
