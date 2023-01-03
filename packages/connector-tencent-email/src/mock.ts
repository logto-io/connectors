import type { SendTencentMailConfig } from '@/types';

export const mockedConfig: SendTencentMailConfig = {
  accessKeyId: 'some-access-key-id',
  accessKeySecret: 'some-access-key-secret',
  region: 'some-region',
  fromAddress: 'some-from-address',
  fromName: 'some-from-name',
  replyAddress: 'some-replay-address',
  templates: [
    {
      usageType: 'Test',
      subject: 'Logto Test Template',
      templateId: '123456',
      params: [
        {
          name: 'code',
          value: 'code',
        },
      ],
    },
  ],
};

export const mockedOptionConfig: SendTencentMailConfig = {
  accessKeyId: 'some-access-key-id',
  accessKeySecret: 'some-access-key-secret',
  region: 'some-region',
  templates: [
    {
      fromAddress: 'some-from-address',
      fromName: 'some-from-name',
      replyAddress: 'some-replay-address',
      usageType: 'Test',
      subject: 'Logto Test Template',
      templateId: '123456',
      params: [
        {
          name: 'code',
          value: 'code',
        },
      ],
    },
  ],
};

export const errorConfig: SendTencentMailConfig = {
  accessKeyId: 'some-access-key-id',
  accessKeySecret: 'some-access-key-secret',
  region: 'some-region',
  templates: [
    {
      usageType: 'Test',
      subject: 'Logto Test Template',
      templateId: '123456',
      params: [
        {
          name: 'code',
          value: 'code',
        },
      ],
    },
  ],
};
