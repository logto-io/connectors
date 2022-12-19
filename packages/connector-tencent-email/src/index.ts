import type {
  CreateConnector,
  EmailConnector,
  GetConnectorConfig,
  SendMessageFunction,
} from '@logto/connector-kit';
import {
  ConnectorError,
  ConnectorErrorCodes,
  ConnectorType,
  validateConfig,
} from '@logto/connector-kit';
import { assert } from '@silverhand/essentials';
import { HTTPError } from 'got';

import { isErrorResponse, request } from '@/http';
import type { MailTemplateType, SendTencentMailConfig, ValueNames } from '@/types';
import { sendTencentMailConfigGuard } from '@/types';

import { defaultMetadata } from './constant';

function getTemplate(templates: MailTemplateType[], usageType: string): MailTemplateType {
  const template = templates.find((template) => template.usageType === usageType);
  assert(
    template,
    new ConnectorError(
      ConnectorErrorCodes.TemplateNotFound,
      `Template not found for type: ${usageType}`
    )
  );

  return template;
}

function buildFromName(fromName: string, fromAddress: string): string {
  return fromName.trim().length > 0 ? `${fromName} <${fromAddress}>` : fromAddress;
}

function buildTemplatePayload(
  template: MailTemplateType,
  templateParameters: Record<typeof ValueNames[number], string>
): Record<string, string> {
  return template.params.reduce<Record<string, string>>((accumulator, parameter) => {
    const { name, value } = parameter;

    return {
      ...accumulator,
      [name]: templateParameters[value],
    };
  }, {});
}

const sendMessage =
  (
    getConfig: GetConnectorConfig
  ): SendMessageFunction => // eslint-disable-next-line complexity
  async (data, inputConfig) => {
    const { to, type, payload } = data;
    const config = inputConfig ?? (await getConfig(defaultMetadata.id));
    validateConfig<SendTencentMailConfig>(config, sendTencentMailConfigGuard);
    const { accessKeyId, accessKeySecret, region, fromAddress, fromName, replyAddress, templates } =
      config;

    const mailTemplate: MailTemplateType = getTemplate(templates, type);

    const fromAddressValue = mailTemplate.fromAddress ?? fromAddress ?? '';

    assert(
      fromAddressValue.length > 0,
      new ConnectorError(
        ConnectorErrorCodes.InvalidConfig,
        `mail params not found, fromAddress is required`
      )
    );

    const fromNameValue = mailTemplate.fromName ?? fromName ?? '';

    const templateParameters: Record<typeof ValueNames[number], string> = {
      code: payload.code,
      toAddress: to,
      fromAddress: fromAddressValue,
      fromName: buildFromName(fromNameValue, fromAddressValue),
      replyAddress: mailTemplate.replyAddress ?? replyAddress ?? '',
      subject: mailTemplate.subject,
    };

    const emailTemplateParametersPayload = buildTemplatePayload(mailTemplate, templateParameters);

    try {
      const response = await request(
        {
          fromEmailAddress: templateParameters.fromAddress,
          replyAddress: templateParameters.replyAddress,
          destination: templateParameters.toAddress,
          subject: templateParameters.subject,
          template: {
            templateData: JSON.stringify(emailTemplateParametersPayload),
            templateId: mailTemplate.templateId,
          },
        },
        {
          region,
          secretId: accessKeyId,
          secretKey: accessKeySecret,
        }
      );
      const { body: rawBody } = response;

      if (isErrorResponse(rawBody)) {
        throw new ConnectorError(
          ConnectorErrorCodes.InvalidResponse,
          `Tencent email response error: ${rawBody.Response.Error.Message}`
        );
      }
      const { Response } = rawBody;
      assert(
        Response,
        new ConnectorError(ConnectorErrorCodes.InvalidResponse, `Tencent email response not found`)
      );

      return response;
    } catch (error: unknown) {
      if (error instanceof ConnectorError) {
        throw error;
      }

      if (error instanceof HTTPError) {
        throw new ConnectorError(
          ConnectorErrorCodes.InvalidResponse,
          `Tencent email response error: ${error.message}`
        );
      }
      throw new ConnectorError(ConnectorErrorCodes.General, `Tencent email unknown error`);
    }
  };

const createSendGridMailConnector: CreateConnector<EmailConnector> = async ({ getConfig }) => {
  return {
    metadata: defaultMetadata,
    type: ConnectorType.Email,
    configGuard: sendTencentMailConfigGuard,
    sendMessage: sendMessage(getConfig),
  };
};

export default createSendGridMailConnector;
