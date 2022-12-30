import { endpoint } from '@/constant';
import { ConnectorError, ConnectorErrorCodes, VerificationCodeType } from '@logto/connector-kit';
import nock from 'nock';

import createConnector from '.';
import { errorConfig, mockedConfig, mockedOptionConfig } from './mock';

const getSuccess1Config = jest.fn().mockResolvedValue(mockedConfig);
const getSuccess2Config = jest.fn().mockResolvedValue(mockedOptionConfig);
const getErrorConfig = jest.fn().mockResolvedValue(errorConfig);

describe('Tencent mail connector', () => {
  it('should not throw errors using config definition method 1', async () => {
    await expect(createConnector({ getConfig: getSuccess1Config })).resolves.not.toThrow();
  });

  it('init without throwing errors, config define method 2', async () => {
    await expect(createConnector({ getConfig: getSuccess2Config })).resolves.not.toThrow();
  });

  it('throws with invalid config', async () => {
    const connector = await createConnector({ getConfig: getErrorConfig });
    await expect(
      connector.sendMessage({
        to: '',
        type: VerificationCodeType.Register,
        payload: { code: '' },
      })
    ).rejects.toThrow();
  });
});

describe('Tencent mail connector params error', () => {
  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  it('sendMessage request error', async () => {
    nock(`https://${endpoint}`)
      .post('/')
      .reply(200, {
        Response: {
          RequestId: '123456',
          Error: {
            Code: 'InvalidParameterValue.InvalidToAddress',
            Message: 'Invalid to address.',
          },
        },
      });

    const connector = await createConnector({ getConfig: getSuccess1Config });

    await expect(
      connector.sendMessage({
        to: '',
        type: VerificationCodeType.Test,
        payload: { code: '' },
      })
    ).rejects.toThrowError(
      new ConnectorError(
        ConnectorErrorCodes.InvalidResponse,
        'Tencent email response error: Invalid to address.'
      )
    );
  });

  it('sendMessage request success', async () => {
    nock(`https://${endpoint}`)
      .post('/')
      .reply(200, {
        Response: {
          RequestId: '123456',
          MessageId: '123456',
        },
      });

    const connector = await createConnector({ getConfig: getSuccess1Config });

    await expect(
      connector.sendMessage({
        to: '',
        type: VerificationCodeType.Test,
        payload: { code: '' },
      })
    ).resolves.not.toThrow();
  });
});
