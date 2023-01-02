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
import { assert, pick } from '@silverhand/essentials';
import { got, HTTPError } from 'got';
import snakecaseKeys from 'snakecase-keys';

import { defaultMetadata, defaultTimeout } from './constant.js';
import type { OauthConfig } from './types.js';
import { oauthConfigGuard, OauthGrantType } from './types.js';
import {
  userProfileMapping,
  getAuthorizationCodeFlowAccessToken,
  getImplicitFlowAccessToken,
} from './utils.js';

const removeUndefinedKeys = (object: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined));

const getAuthorizationUri =
  (getConfig: GetConnectorConfig): GetAuthorizationUri =>
  async ({ state, redirectUri }, setSession) => {
    const config = await getConfig(defaultMetadata.id);
    validateConfig<OauthConfig>(config, oauthConfigGuard);
    const parsedConfig = oauthConfigGuard.parse(config);

    const { customConfig, ...rest } = parsedConfig;

    const parameterObject = snakecaseKeys({
      ...pick(rest, 'responseType', 'clientId', 'scope'),
      ...customConfig,
    });

    assert(
      setSession,
      new ConnectorError(ConnectorErrorCodes.NotImplemented, {
        message: 'Function `setSession()` is not implemented.',
      })
    );
    await setSession({ redirectUri });

    const queryParameters = new URLSearchParams({
      ...removeUndefinedKeys(parameterObject),
      state,
      redirect_uri: redirectUri,
    });

    return `${parsedConfig.authorizationEndpoint}?${queryParameters.toString()}`;
  };

const getAccessToken = async (config: OauthConfig, data: unknown, redirectUri: string) => {
  if (config.oauthGrantType === OauthGrantType.AuthorizationCode) {
    return getAuthorizationCodeFlowAccessToken(config, data, redirectUri);
  }

  return getImplicitFlowAccessToken(data);
};

const getUserInfo =
  (getConfig: GetConnectorConfig): GetUserInfo =>
  async (data, getSession) => {
    const config = await getConfig(defaultMetadata.id);
    validateConfig<OauthConfig>(config, oauthConfigGuard);
    const parsedConfig = oauthConfigGuard.parse(config);

    assert(
      getSession,
      new ConnectorError(ConnectorErrorCodes.NotImplemented, {
        message: 'Function `getSession()` is not implemented.',
      })
    );
    const { redirectUri } = await getSession();
    assert(
      redirectUri,
      new ConnectorError(ConnectorErrorCodes.General, {
        message: 'Cannot find `redirectUri` from connector session.',
      })
    );

    const { access_token, token_type } = await getAccessToken(parsedConfig, data, redirectUri);

    try {
      const httpResponse = await got.get(parsedConfig.userInfoEndpoint, {
        headers: {
          authorization: `${token_type} ${access_token}`,
        },
        timeout: { request: defaultTimeout },
      });

      return userProfileMapping(parseJson(httpResponse.body), parsedConfig.profileMap);
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        throw new ConnectorError(ConnectorErrorCodes.General, JSON.stringify(error.response.body));
      }

      throw error;
    }
  };

const createOauthConnector: CreateConnector<SocialConnector> = async ({ getConfig }) => {
  return {
    metadata: defaultMetadata,
    type: ConnectorType.Social,
    configGuard: oauthConfigGuard,
    getAuthorizationUri: getAuthorizationUri(getConfig),
    getUserInfo: getUserInfo(getConfig),
  };
};

export default createOauthConnector;
