import { MessageTypes } from '@logto/connector-kit';

import createConnector from '.';
import { mockedConfig } from './mock';

const getConfig = jest.fn().mockResolvedValue(mockedConfig);

describe('sendMessage()', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should call SendMail() and replace code in content', async () => {
    const connector = await createConnector({ getConfig });
    await connector.sendMessage({
      to: 'to@email.com',
      type: MessageTypes.SignIn,
      payload: { code: '1234' },
    });
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
