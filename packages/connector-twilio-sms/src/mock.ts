import type { TwilioSmsConfig } from './types.js';

const mockedAccountSID = 'account-sid';
const mockedAuthToken = 'auth-token';
const mockedFromMessagingServiceSID = 'from-messaging-service-sid';

export const mockedConfig: TwilioSmsConfig = {
  accountSID: mockedAccountSID,
  authToken: mockedAuthToken,
  fromMessagingServiceSID: mockedFromMessagingServiceSID,
  templates: [
    {
      usageType: 'Test',
      content: 'This is for testing purposes only. Your verification code is {{code}}.',
    },
  ],
};
