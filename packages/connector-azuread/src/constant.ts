import type { ConnectorMetadata } from '@logto/connector-kit';
import { ConnectorPlatform, ConnectorConfigFormItemType } from '@logto/connector-kit';

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
    ko: 'Azure Active Directory',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: 'Azure Active Directory is a leading AD provider.',
    'zh-CN': 'Azure Active Directory 是领先的 AD 服务提供商。',
    'tr-TR': 'Azure Active Directory en büyük AD servisidir.', // UNTRANSLATED
    ko: 'Azure Active Directory is the biggest AD provider.', // UNTRANSLATED
  },
  readme: './README.md',
  formItems: [
    {
      key: 'clientId',
      type: ConnectorConfigFormItemType.Text,
      required: true,
      label: 'Client ID',
      placeholder: '<client-id>',
    },
    {
      key: 'clientSecret',
      type: ConnectorConfigFormItemType.Text,
      required: true,
      label: 'Client Secret',
      placeholder: '<client-secret>',
    },
    {
      key: 'cloudInstance',
      type: ConnectorConfigFormItemType.Text,
      required: true,
      label: 'Cloud Instance',
      placeholder: '<cloud-instance>',
    },
    {
      key: 'tenantId',
      type: ConnectorConfigFormItemType.Text,
      required: true,
      label: 'Tenant ID',
      placeholder: '<tenant-id>',
    },
  ],
};

export const defaultTimeout = 5000;
