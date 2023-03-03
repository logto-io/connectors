import type { ConnectorMetadata } from '@logto/connector-kit';
import { ConnectorConfigFormItemType } from '@logto/connector-kit';

export const endpoint = 'https://api.twilio.com/2010-04-01/Accounts/{{accountSID}}/Messages.json';

export const defaultMetadata: ConnectorMetadata = {
  id: 'twilio-short-message-service',
  target: 'twilio-sms',
  platform: null,
  name: {
    en: 'Twilio SMS Service',
    'zh-CN': 'Twilio 短信服务',
    'tr-TR': 'Twilio SMS Servisi',
    ko: 'Twilio SMS 서비스',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: 'Twilio provides programmable communication tools for phone calls and messages.',
    'zh-CN': 'Twilio 是一个提供面向消费者的可编程通讯服务的平台。',
    'tr-TR':
      'Twilio, telefon görüşmeleri ve mesajlar için programlanabilir iletişim araçları sağlar.',
    ko: 'Twilio는 전화 및 SMS을 할 수 있도록 개발자 도구를 제공합니다.',
  },
  readme: './README.md',
  formItems: [
    {
      key: 'accountSID',
      label: 'Account SID',
      type: ConnectorConfigFormItemType.Text,
      required: true,
      placeholder: '<account-sid>',
    },
    {
      key: 'authToken',
      label: 'Auth Token',
      type: ConnectorConfigFormItemType.Text,
      required: true,
      placeholder: '<auth-token>',
    },
    {
      key: 'fromMessagingServiceSID',
      label: 'From Messaging Service SID',
      type: ConnectorConfigFormItemType.Text,
      required: true,
      placeholder: '<from-messaging-service-sid>',
    },
    {
      key: 'templates',
      label: 'Templates',
      type: ConnectorConfigFormItemType.Json,
      required: true,
      defaultValue: [
        {
          usageType: 'SignIn',
          content: 'This is for sign-in purposes only. Your verification code is {{code}}.',
        },
        {
          usageType: 'Register',
          content: 'This is for registering purposes only. Your verification code is {{code}}.',
        },
        {
          usageType: 'ForgotPassword',
          content:
            'This is for resetting password purposes only. Your verification code is {{code}}.',
        },
        {
          usageType: 'Generic',
          content:
            'This is for generic purposes through management API only. Your verification code is {{code}}.',
        },
        {
          usageType: 'Test',
          content: 'This is for testing purposes only. Your verification code is {{code}}.',
        },
      ],
    },
  ],
};
