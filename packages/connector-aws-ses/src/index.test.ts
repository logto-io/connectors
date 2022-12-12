import { SESv2Client } from '@aws-sdk/client-sesv2';
import { MessageTypes } from '@logto/connector-kit';

import createConnector from '.';
import { mockedConfig } from './mock';

const getConfig = jest.fn().mockResolvedValue(mockedConfig);

jest.spyOn(SESv2Client.prototype, 'send').mockResolvedValue({
  MessageId: 'mocked-message-id',
  $metadata: {
    httpStatusCode: 200,
  },
} as never);

describe('sendMessage()', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should call SendMail() and replace code in content', async () => {
    const connector = await createConnector({ getConfig });
    const to_mail = 'to@email.com';
    const { emailAddress } = mockedConfig;
    await connector.sendMessage({
      to: to_mail,
      type: MessageTypes.SignIn,
      payload: { code: '1234' },
    });
    const to_expected = [to_mail];
    expect(SESv2Client.prototype.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          FromEmailAddress: emailAddress,
          Destination: { ToAddresses: to_expected },
          Content: {
            Simple: {
              Subject: { Data: 'subject', Charset: 'utf8' },
              Body: {
                Html: {
                  Data: 'Your code is 1234, 1234 is your code',
                },
              },
            },
          },
          FeedbackForwardingEmailAddress: undefined,
          FeedbackForwardingEmailAddressIdentityArn: undefined,
          FromEmailAddressIdentityArn: undefined,
          ConfigurationSetName: undefined,
        },
      })
    );

    // Expect(SESv2Client.prototype.send).toHaveBeenCalledWith(
    //   new SendEmailCommand({
    //     FromEmailAddress: emailAddress,
    //     Destination: { ToAddresses: to_expected },
    //     Content: {
    //       Simple: {
    //         Subject: { Data: 'subject', Charset: 'utf8' },
    //         Body: {
    //           Html: expect.objectContaining({
    //             Data: 'Your code is 1234, 1234 is your code',
    //           }) as Content,
    //         },
    //       },
    //     },
    //     FeedbackForwardingEmailAddress: undefined,
    //     FeedbackForwardingEmailAddressIdentityArn: undefined,
    //     FromEmailAddressIdentityArn: undefined,
    //     ConfigurationSetName: undefined,
    //   })
    // );

    // expect(SESv2Client.prototype.send).toHaveBeenCalledWith(
    //   new SendEmailCommand({
    //     FromEmailAddress: emailAddress,
    //     Destination: { ToAddresses: to_expected },
    //     Content: {
    //       Simple: {
    //         Subject: { Data: 'subject', Charset: 'utf8' },
    //         Body: {
    //           Html: {
    //             Data: 'Your code is 1234, 1234 is your code',
    //           },
    //         },
    //       },
    //     },
    //     FeedbackForwardingEmailAddress: undefined,
    //     FeedbackForwardingEmailAddressIdentityArn: undefined,
    //     FromEmailAddressIdentityArn: undefined,
    //     ConfigurationSetName: undefined,
    //   })
    // );
    // expect(makeEmailContent).toHaveBeenCalled();
    // expect(makeCommand).toHaveBeenCalled();
    // expect(makeEmailContent).toBe({
    //   Simple: {
    //     Subject: { Data: 'subject', Charset: 'utf8' },
    //     Body: {
    //       Html: {
    //         Data: 'Your code is 1234, 1234 is your code',
    //       },
    //     },
    //   },
    // });
    // Expect(SESv2Client.prototype.send).toHaveBeenCalledWith(
    //   const
    //   );
  });

  it('throws if template is missing', async () => {
    const connector = await createConnector({ getConfig });
    await expect(
      connector.sendMessage({
        to: 'to@email.com',
        type: MessageTypes.Register,
        payload: { code: '1234' },
      })
    ).rejects.toThrow();
  });
});
