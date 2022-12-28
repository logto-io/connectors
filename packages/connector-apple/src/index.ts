import type {
  GetAuthorizationUri,
  GetUserInfo,
  GetConnectorConfig,
  CreateConnector,
  SocialConnector,
} from '@logto/connector-kit';
import {
  ConnectorError,
  ConnectorErrorCodes,
  validateConfig,
  ConnectorType,
} from '@logto/connector-kit';
import { assert } from '@silverhand/essentials';
import { createRemoteJWKSet, jwtVerify } from 'jose';

import { scope, defaultMetadata, jwksUri, issuer, authorizationEndpoint } from './constant';
import type { AppleConfig } from './types';
import { appleConfigGuard, dataGuard } from './types';
import { buildIdGenerator } from './utils';

const generateNonce = () => buildIdGenerator(12)();

const getAuthorizationUri =
  (getConfig: GetConnectorConfig): GetAuthorizationUri =>
  async ({ state, redirectUri }, setSession) => {
    const config = await getConfig(defaultMetadata.id);

    validateConfig<AppleConfig>(config, appleConfigGuard);

    const nonce = generateNonce();

    const queryParameters = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: redirectUri,
      scope,
      state,
      nonce,
      // https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/incorporating_sign_in_with_apple_into_other_platforms#3332113
      response_type: 'code id_token',
      response_mode: 'fragment',
    });

    assert(
      setSession,
      new ConnectorError(ConnectorErrorCodes.NotImplemented, {
        message: "'setSession' is not implemented.",
      })
    );
    await setSession({ nonce });

    return `${authorizationEndpoint}?${queryParameters.toString()}`;
  };

const getUserInfo =
  (getConfig: GetConnectorConfig): GetUserInfo =>
  async (data, getSession) => {
    const { id_token: idToken } = await authorizationCallbackHandler(data);

    if (!idToken) {
      throw new ConnectorError(ConnectorErrorCodes.SocialIdTokenInvalid);
    }

    const config = await getConfig(defaultMetadata.id);
    validateConfig<AppleConfig>(config, appleConfigGuard);

    const { clientId } = config;

    try {
      const { payload } = await jwtVerify(idToken, createRemoteJWKSet(new URL(jwksUri)), {
        issuer,
        audience: clientId,
      });

      if (payload.nonce) {
        // TODO @darcy: need to specify error code
        assert(
          getSession,
          new ConnectorError(ConnectorErrorCodes.NotImplemented, {
            message: "'getSession' is not implemented.",
          })
        );
        const { nonce: validationNonce } = await getSession();

        assert(
          validationNonce,
          new ConnectorError(ConnectorErrorCodes.General, {
            message: "'nonce' not presented in session storage.",
          })
        );

        assert(
          validationNonce === payload.nonce,
          new ConnectorError(ConnectorErrorCodes.SocialIdTokenInvalid, {
            message: "IdToken validation failed due to 'nonce' mismatch.",
          })
        );
      }

      if (!payload.sub) {
        throw new ConnectorError(ConnectorErrorCodes.SocialIdTokenInvalid);
      }

      return {
        id: payload.sub,
      };
    } catch {
      throw new ConnectorError(ConnectorErrorCodes.SocialIdTokenInvalid);
    }
  };

const authorizationCallbackHandler = async (parameterObject: unknown) => {
  const result = dataGuard.safeParse(parameterObject);

  if (!result.success) {
    throw new ConnectorError(ConnectorErrorCodes.General, JSON.stringify(parameterObject));
  }

  return result.data;
};

const createAppleConnector: CreateConnector<SocialConnector> = async ({ getConfig }) => {
  return {
    metadata: defaultMetadata,
    type: ConnectorType.Social,
    configGuard: appleConfigGuard,
    getAuthorizationUri: getAuthorizationUri(getConfig),
    getUserInfo: getUserInfo(getConfig),
  };
};

export default createAppleConnector;
