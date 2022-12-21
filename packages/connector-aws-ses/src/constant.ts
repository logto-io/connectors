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
    en: 'Amazon SES is a cloud email service provider that can integrate into any application for bulk email sending.',
    'zh-CN':
      'Amazon SES 是云电子邮件发送服务提供商，它可以集成到任何应用程序中，用于批量发送电子邮件。',
    'tr-TR':
      'Amazon SES, toplu e-posta dağıtımı için herhangi bir uygulamaya entegre edilebilen bir bulut e-posta dağıtım hizmeti sağlayıcısıdır.',
    ko: 'Amazon SES는 모든 애플리케이션에 통합하여 대량으로 이메일을 전송할 수 있는 클라우드 이메일 서비스 공급자입니다.',
  },
  readme: './README.md',
  configTemplate: './docs/config-template.json',
};
