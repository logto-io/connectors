import type {
  GetConnectorConfig,
  SendMessageFunction,
  CreateConnector,
  EmailConnector,
} from '@logto/connector-kit';
import {
  ConnectorError,
  ConnectorErrorCodes,
  validateConfig,
  ConnectorType,
} from '@logto/connector-kit';
import { assert } from '@silverhand/essentials';
import { got, HTTPError } from 'got';

import { defaultMetadata, endpoint } from './constant.js';
import type {
  SendGridMailConfig,
  EmailData,
  Personalization,
  Content,
  PublicParameters,
} from './types.js';
import { sendGridMailConfigGuard } from './types.js';

const sendMessage =
  (getConfig: GetConnectorConfig): SendMessageFunction =>
  async (data, inputConfig) => {
    const { to, type, payload } = data;
    const config = inputConfig ?? (await getConfig(defaultMetadata.id));
    validateConfig<SendGridMailConfig>(config, sendGridMailConfigGuard);
    const { apiKey, fromEmail, fromName, templates } = config;
    const template = templates.find((template) => template.usageType === type);

    assert(
      template,
      new ConnectorError(
        ConnectorErrorCodes.TemplateNotFound,
        `Template not found for type: ${type}`
      )
    );

    const toEmailData: EmailData[] = [{ email: to }];
    const fromEmailData: EmailData = fromName
      ? { email: fromEmail, name: fromName }
      : { email: fromEmail };
    const personalizations: Personalization = { to: toEmailData };
    const content: Content = {
      type: template.type,
      value:
        typeof payload.code === 'string'
          ? template.content.replace(/{{code}}/g, payload.code)
          : template.content,
    };
    const { subject } = template;

    const parameters: PublicParameters = {
      personalizations: [personalizations],
      from: fromEmailData,
      subject,
      content: [content],
    };

    try {
      return await got.post(endpoint, {
        headers: {
          Authorization: 'Bearer ' + apiKey,
          'Content-Type': 'application/json',
        },
        json: parameters,
      });
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        const {
          response: { body: rawBody },
        } = error;
        assert(
          typeof rawBody === 'string',
          new ConnectorError(
            ConnectorErrorCodes.InvalidResponse,
            `wrong response body type: ${typeof rawBody}`
          )
        );

        throw new ConnectorError(ConnectorErrorCodes.General, rawBody);
      }

      throw error;
    }
  };

const createSendGridMailConnector: CreateConnector<EmailConnector> = async ({ getConfig }) => {
  return {
    metadata: defaultMetadata,
    type: ConnectorType.Email,
    configGuard: sendGridMailConfigGuard,
    sendMessage: sendMessage(getConfig),
  };
};

export default createSendGridMailConnector;
