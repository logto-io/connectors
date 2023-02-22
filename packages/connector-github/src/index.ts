/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type {
  GetAuthorizationUri,
  GetUserInfo,
  SocialConnector,
  CreateConnector,
  GetConnectorConfig,
} from '@logto/connector-kit';
import {
  ConnectorError,
  ConnectorErrorCodes,
  validateConfig,
  ConnectorType,
  parseJson,
} from '@logto/connector-kit';
import { assert, conditional } from '@silverhand/essentials';
import equal from 'fast-deep-equal';
import { got, HTTPError } from 'got';
import qs from 'query-string';

import {
  authorizationEndpoint,
  accessTokenEndpoint,
  scope,
  userInfoEndpoint,
  defaultMetadata,
  defaultTimeout,
} from './constant.js';
import type { GithubConfig } from './types.js';
import {
  authorizationCallbackErrorGuard,
  githubConfigGuard,
  accessTokenResponseGuard,
  userInfoResponseGuard,
  authResponseGuard,
} from './types.js';

const getAuthorizationUri =
  (getConfig: GetConnectorConfig): GetAuthorizationUri =>
  async ({ state, redirectUri }) => {
    const config = await getConfig(defaultMetadata.id);
    validateConfig<GithubConfig>(config, githubConfigGuard);
    const queryParameters = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: redirectUri,
      state,
      scope, // Only support fixed scope for v1.
    });

    return `${authorizationEndpoint}?${queryParameters.toString()}`;
  };

const authorizationCallbackHandler = async (parameterObject: unknown) => {
  const result = authResponseGuard.safeParse(parameterObject);

  if (result.success) {
    return result.data;
  }

  const parsedError = authorizationCallbackErrorGuard.safeParse(parameterObject);

  if (!parsedError.success) {
    throw new ConnectorError(ConnectorErrorCodes.General, JSON.stringify(parameterObject));
  }

  const { error, error_description, error_uri } = parsedError.data;

  if (error === 'access_denied') {
    throw new ConnectorError(ConnectorErrorCodes.AuthorizationFailed, error_description);
  }

  throw new ConnectorError(ConnectorErrorCodes.General, {
    error,
    errorDescription: error_description,
    error_uri,
  });
};

export const getAccessToken = async (config: GithubConfig, codeObject: { code: string }) => {
  const { code } = codeObject;
  const { clientId: client_id, clientSecret: client_secret } = config;

  const httpResponse = await got.post({
    url: accessTokenEndpoint,
    json: {
      client_id,
      client_secret,
      code,
    },
    timeout: { request: defaultTimeout },
  });

  const result = accessTokenResponseGuard.safeParse(qs.parse(httpResponse.body));

  if (!result.success) {
    throw new ConnectorError(ConnectorErrorCodes.InvalidResponse, result.error);
  }

  const { access_token: accessToken } = result.data;

  assert(accessToken, new ConnectorError(ConnectorErrorCodes.SocialAuthCodeInvalid));

  return { accessToken };
};

const getUserInfo =
  (getConfig: GetConnectorConfig): GetUserInfo =>
  async (data, _, { get, set }) => {
    const { code } = await authorizationCallbackHandler(data);
    const config = await getConfig(defaultMetadata.id);
    validateConfig<GithubConfig>(config, githubConfigGuard);
    const { accessToken } = await getAccessToken(config, { code });

    const at = await get('accessToken');
    console.log('null accessToken', at, equal(at, null));
    await set('accessToken', accessToken);
    const setAt = await get('accessToken');
    console.log('latest accessToken', equal(setAt, accessToken));
    const rawObject = {
      a: 1,
      b: '2',
      c: true,
      d: [1, null, 2, '3'],
      e: { a: 1, b: '2', c: true, d: [null, 2, '3', false] },
      f: null,
    };
    await set('rawObject', rawObject);
    const getRawObject = await get('rawObject');
    console.log('rawObject:', rawObject);
    console.log('getRawObject:', getRawObject);
    console.log('getRawObject equals rawObject', equal(getRawObject, rawObject));
    const atAndTime = { accessToken, isoTimeString: new Date().toISOString() };
    await set('rawObject', atAndTime);
    const getNewRawObject = await get('rawObject');
    console.log('atAndTime:', atAndTime);
    console.log('getNewRawObject:', getNewRawObject);
    console.log('getNewRawObject equals atAndTime', equal(getNewRawObject, atAndTime));

    try {
      const httpResponse = await got.get(userInfoEndpoint, {
        headers: {
          authorization: `token ${accessToken}`,
        },
        timeout: { request: defaultTimeout },
      });

      const result = userInfoResponseGuard.safeParse(parseJson(httpResponse.body));

      if (!result.success) {
        throw new ConnectorError(ConnectorErrorCodes.InvalidResponse, result.error);
      }

      const { id, avatar_url: avatar, email, name } = result.data;

      return {
        id: String(id),
        avatar: conditional(avatar),
        email: conditional(email),
        name: conditional(name),
      };
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        const { statusCode, body: rawBody } = error.response;

        if (statusCode === 401) {
          throw new ConnectorError(ConnectorErrorCodes.SocialAccessTokenInvalid);
        }

        throw new ConnectorError(ConnectorErrorCodes.General, JSON.stringify(rawBody));
      }

      throw error;
    }
  };

const createGithubConnector: CreateConnector<SocialConnector> = async ({ getConfig }) => {
  return {
    metadata: defaultMetadata,
    type: ConnectorType.Social,
    configGuard: githubConfigGuard,
    getAuthorizationUri: getAuthorizationUri(getConfig),
    getUserInfo: getUserInfo(getConfig),
  };
};

export default createGithubConnector;
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
/* eslint-enable @typescript-eslint/no-unsafe-call */
