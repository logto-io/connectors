import type { ConnectorMetadata } from '@logto/connector-kit';

export const endpoint = 'ses.tencentcloudapi.com';

export const defaultMetadata: ConnectorMetadata = {
  id: 'tencent-email-service',
  target: 'tencent-mail',
  platform: null,
  name: {
    en: 'Tencent Mail Service',
    'zh-CN': '腾讯云邮件服务',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: 'Tencent',
    'zh-CN': 'Tencent',
  },
  readme: './README.md',
  configTemplate: './docs/config-template.json',
};
