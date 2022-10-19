import {
  ConnectorError,
  ConnectorErrorCodes,
  GetConnectorConfig,
  CreateConnector,
  EmailConnector,
  SendMessageFunction,
  validateConfig,
  ConnectorType,
} from '@logto/connector-kit';
import { assert } from '@silverhand/essentials';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { defaultMetadata } from './constant';
import { ContextType, smtpConfigGuard, SmtpConfig } from './types';

const sendMessage =
  (getConfig: GetConnectorConfig): SendMessageFunction =>
  async (data, inputConfig) => {
    const { to, type, payload } = data;
    const config = inputConfig ?? (await getConfig(defaultMetadata.id));
    validateConfig<SmtpConfig>(config, smtpConfigGuard);
    const template = config.templates.find((template) => template.usageType === type);

    assert(
      template,
      new ConnectorError(
        ConnectorErrorCodes.TemplateNotFound,
        `Template not found for type: ${type}`
      )
    );

    const configOptions: SMTPTransport.Options = config;

    const transporter = nodemailer.createTransport(configOptions);

    const contentsObject = parseContents(
      typeof payload.code === 'string'
        ? template.content.replace(/{{code}}/g, payload.code)
        : template.content,
      template.contentType
    );

    const mailOptions = {
      to,
      from: config.fromEmail,
      replyTo: config.replyTo,
      subject: template.subject,
      ...contentsObject,
    };

    try {
      return await transporter.sendMail(mailOptions);
    } catch (error: unknown) {
      throw new ConnectorError(
        ConnectorErrorCodes.General,
        error instanceof Error ? error.message : ''
      );
    }
  };

const parseContents = (contents: string, contentType: ContextType) => {
  switch (contentType) {
    case ContextType.Text:
      return { text: contents };
    case ContextType.Html:
      return { html: contents };
    default:
      throw new ConnectorError(
        ConnectorErrorCodes.InvalidConfig,
        '`contentType` should be ContextType.'
      );
  }
};

const createSmtpConnector: CreateConnector<EmailConnector> = async ({ getConfig }) => {
  return {
    metadata: defaultMetadata,
    type: ConnectorType.Email,
    configGuard: smtpConfigGuard,
    sendMessage: sendMessage(getConfig),
  };
};

export default createSmtpConnector;
