import type {
  GetConnectorConfig,
  SendMessageFunction,
  SmsConnector,
  CreateConnector,
} from '@logto/connector-kit';
import {
  ConnectorError,
  ConnectorErrorCodes,
  validateConfig,
  ConnectorType,
  parseJson,
} from '@logto/connector-kit';
import { assert } from '@silverhand/essentials';
import { HTTPError } from 'got';
import { parsePhoneNumberWithError } from 'libphonenumber-js';

import { defaultMetadata } from './constant.js';
import { sendSms } from './single-send-text.js';
import type { AliyunSmsConfig } from './types.js';
import { aliyunSmsConfigGuard, sendSmsResponseGuard } from './types.js';

const sendMessage =
  (getConfig: GetConnectorConfig): SendMessageFunction =>
  async (data, inputConfig) => {
    const { to, type, payload } = data;
    const config = inputConfig ?? (await getConfig(defaultMetadata.id));
    validateConfig<AliyunSmsConfig>(config, aliyunSmsConfigGuard);

    const phoneNumber = parsePhoneNumberWithError(to); // Phone number has already been parsed to enforce that it consists with the pure digit format of "region code + phone number".
    const { countryCallingCode, country } = phoneNumber; // `country` is 'CN'; `countryCallingCode` is '86', see https://gitlab.com/catamphetamine/libphonenumber-js for reference

    const { accessKeyId, accessKeySecret, signName, templates } = config;
    const template = templates.find(
      ({ usageType, countryCode, regionCode }) =>
        usageType === type && (country === countryCode || countryCallingCode === regionCode)
    );

    assert(
      template,
      new ConnectorError(ConnectorErrorCodes.TemplateNotFound, `Cannot find template!`)
    );

    const { regionId: RegionId, endpoint, templateCode, version: Version } = template;

    try {
      const httpResponse = await sendSms(
        {
          AccessKeyId: accessKeyId,
          PhoneNumbers: to,
          SignName: signName,
          TemplateCode: templateCode,
          TemplateParam: JSON.stringify(payload),
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          ...(RegionId || Version ? { RegionId, Version } : {}),
        },
        accessKeySecret,
        endpoint
      );

      const { body: rawBody } = httpResponse;

      const { Code, Message, ...rest } = parseResponseString(rawBody);

      if (Code !== 'OK') {
        throw new ConnectorError(ConnectorErrorCodes.General, {
          errorDescription: Message,
          Code,
          ...rest,
        });
      }

      return httpResponse;
    } catch (error: unknown) {
      if (!(error instanceof HTTPError)) {
        throw error;
      }

      const {
        response: { body: rawBody },
      } = error;

      assert(typeof rawBody === 'string', new ConnectorError(ConnectorErrorCodes.InvalidResponse));

      const { Code, Message, ...rest } = parseResponseString(rawBody);

      throw new ConnectorError(ConnectorErrorCodes.General, {
        errorDescription: Message,
        Code,
        ...rest,
      });
    }
  };

const parseResponseString = (response: string) => {
  const result = sendSmsResponseGuard.safeParse(parseJson(response));

  if (!result.success) {
    throw new ConnectorError(ConnectorErrorCodes.InvalidResponse, result.error);
  }

  return result.data;
};

const createAliyunSmsConnector: CreateConnector<SmsConnector> = async ({ getConfig }) => {
  return {
    metadata: defaultMetadata,
    type: ConnectorType.Sms,
    configGuard: aliyunSmsConfigGuard,
    sendMessage: sendMessage(getConfig),
  };
};

export default createAliyunSmsConnector;
