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
import { assert } from '@silverhand/essentials';
import got, { HTTPError } from 'got';
import omit from 'lodash.omit';
import snakecaseKeys from 'snakecase-keys';

import { defaultMetadata, defaultTimeout, oauthConfigGlobalKeys } from './constant';
import type { OauthConfig } from './types';
import { oauthConfigGuard, OauthGrantType } from './types';
import {
  userProfileMapping,
  getAuthorizationCodeFlowAccessToken,
  getImplicitFlowAccessToken,
} from './utils';

const getAuthorizationUri =
  (getConfig: GetConnectorConfig): GetAuthorizationUri =>
  async ({ state, redirectUri }, setSession) => {
    const config = await getConfig(defaultMetadata.id);
    validateConfig<OauthConfig>(config, oauthConfigGuard);
    const parsedConfig = oauthConfigGuard.parse(config);

    const parameterObject = snakecaseKeys(
      omit(parsedConfig, ...oauthConfigGlobalKeys, 'clientSecret', 'grantType')
    );

    assert(
      setSession,
      new ConnectorError(ConnectorErrorCodes.NotImplemented, {
        message: "'setSession' is not implemented.",
      })
    );
    await setSession({ redirectUri });

    const queryParameters = new URLSearchParams({
      ...parameterObject,
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
        message: "'getSession' is not implemented.",
      })
    );
    const { redirectUri } = await getSession();
    assert(
      redirectUri,
      new ConnectorError(ConnectorErrorCodes.General, {
        message: "CAN NOT find 'redirectUri' from connector session.",
      })
    );

    const { access_token, token_type } = await getAccessToken(parsedConfig, data, redirectUri);

    try {
      const httpResponse = await got.get(parsedConfig.userInfoEndpoint, {
        headers: {
          authorization: `${token_type} ${access_token}`,
        },
        timeout: defaultTimeout,
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
