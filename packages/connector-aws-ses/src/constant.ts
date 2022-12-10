import type { ConnectorMetadata } from '@logto/connector-kit';

export const defaultMetadata: ConnectorMetadata = {
  id: 'aws-ses-mail',
  target: 'aws-ses',
  platform: null,
  name: {
    en: 'AWS Direct Mail',
    'zh-CN': 'AWS邮件推送',
    'tr-TR': 'AWS Direct Mail',
    ko: 'AWS 다이렉트 메일',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: 'AWS provides cloud computing services to online businesses.',
    'zh-CN': 'AWS是全球性的云服务提供商。',
    'tr-TR': 'AWS, çevrimiçi işletmelere bulut bilişim hizmetleri sunmaktadır.',
    ko: 'AWS는 온라인 비지니스를 위해 클라우딩 컴퓨팅 서비스를 제공합니다.',
  },
  readme: './README.md',
  configTemplate: './docs/config-template.json',
};
