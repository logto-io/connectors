import { ConnectorError, ConnectorErrorCodes, parseJson } from '@logto/connector-kit';
import { assert } from '@silverhand/essentials';
import type { Response } from 'got';
import got from 'got';
import omit from 'lodash.omit';
import { customAlphabet } from 'nanoid';
import snakecaseKeys from 'snakecase-keys';

import { defaultTimeout, oauthConfigGlobalKeys } from './constant';
import type { AccessTokenResponse, AuthorizationCodeConfig, HybridConfig } from './types';
import {
  accessTokenResponseGuard,
  delimiter,
  authResponseGuard,
  implicitAuthResponseGuard,
  hybridAuthResponseGuard,
  authorizationCodeFlowOptionalConfigGuard,
} from './types';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
// Temporary use this workaround, this change has been made in @logto/core-kit but has not been published yet.
export const buildIdGenerator = (size: number) => customAlphabet(alphabet, size);

export const accessTokenRequester = async (
  tokenEndpoint: string,
  queryParameters: Record<string, string>,
  timeout: number = defaultTimeout
): Promise<AccessTokenResponse> => {
  const httpResponse = await got.post({
    url: tokenEndpoint,
    form: queryParameters,
    timeout,
  });

  return accessTokenResponseHandler(httpResponse);
};

const accessTokenResponseHandler = async (
  response: Response<string>
): Promise<AccessTokenResponse> => {
  const result = accessTokenResponseGuard.safeParse(parseJson(response.body));

  if (!result.success) {
    throw new ConnectorError(ConnectorErrorCodes.InvalidResponse, result.error);
  }

  assert(result.data.access_token, new ConnectorError(ConnectorErrorCodes.SocialAuthCodeInvalid));

  return result.data;
};

export const isIdTokenInResponseType = (responseType: string) => {
  return responseType.split(delimiter).includes('id_token');
};

export const getAuthorizationCodeFlowIdToken = async (
  config: AuthorizationCodeConfig,
  data: unknown
) => {
  const result = authResponseGuard.safeParse(data);

  if (!result.success) {
    throw new ConnectorError(ConnectorErrorCodes.General, data);
  }

  const { code } = result.data;

  const parameterObject = snakecaseKeys({
    ...omit(
      config,
      ...oauthConfigGlobalKeys,
      ...authorizationCodeFlowOptionalConfigGuard.keyof().options,
      'responseType',
      'scope'
    ),
    code,
  });

  return accessTokenRequester(config.tokenEndpoint, parameterObject);
};

export const getImplicitFlowIdToken = async (data: unknown) => {
  const result = implicitAuthResponseGuard.safeParse(data);

  if (!result.success) {
    throw new ConnectorError(ConnectorErrorCodes.General, data);
  }

  return result.data;
};

export const getHybridFlowIdToken = async (
  config: HybridConfig,
  data: unknown,
  redirectUri?: string
) => {
  assert(
    redirectUri,
    new ConnectorError(ConnectorErrorCodes.General, {
      message: "CAN NOT find 'redirectUri' from connector session.",
    })
  );
  const result = hybridAuthResponseGuard.safeParse(data);

  if (!result.success) {
    throw new ConnectorError(ConnectorErrorCodes.General, data);
  }

  if (result.data.id_token) {
    return result.data;
  }

  assert(
    config.tokenEndpoint,
    new ConnectorError(ConnectorErrorCodes.InvalidConfig, {
      message: "'tokenEndpoint' should be provided since 'id_token' is missed in response type.",
    })
  );

  const { code } = result.data;

  const parameterObject = snakecaseKeys({
    ...omit(
      config,
      ...oauthConfigGlobalKeys,
      ...authorizationCodeFlowOptionalConfigGuard.keyof().options,
      'responseType',
      'scope'
    ),
    code,
    redirectUri,
  });

  return accessTokenRequester(config.tokenEndpoint, parameterObject);
};
