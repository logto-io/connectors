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
} from '@logto/connector-kit';
import { assert, conditional } from '@silverhand/essentials';
import { HTTPError } from 'got';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import omit from 'lodash.omit';
import snakecaseKeys from 'snakecase-keys';

import { defaultMetadata, oauthConfigGlobalKeys } from './constant';
import type { OidcConfig } from './types';
import { idTokenProfileStandardClaimsGuard, oidcConfigGuard, OidcFlowType } from './types';
import {
  buildIdGenerator,
  isIdTokenInResponseType,
  getAuthorizationCodeFlowIdToken,
  getImplicitFlowIdToken,
  getHybridFlowIdToken,
} from './utils';

const generateNonce = () => buildIdGenerator(12)();

const getAuthorizationUri =
  (getConfig: GetConnectorConfig): GetAuthorizationUri =>
  async ({ state, redirectUri }, setSession) => {
    const config = await getConfig(defaultMetadata.id);
    validateConfig<OidcConfig>(config, oidcConfigGuard);
    const parsedConfig = oidcConfigGuard.parse(config);

    const nonce = generateNonce();
    const needNonce = isIdTokenInResponseType(parsedConfig.responseType);

    const parameterObject = {
      ...snakecaseKeys(omit(parsedConfig, ...oauthConfigGlobalKeys, 'clientSecret', 'grantType')),
      ...(needNonce ? { nonce } : {}),
    };

    assert(
      setSession,
      new ConnectorError(ConnectorErrorCodes.NotImplemented, {
        message: "'setSession' is not implemented.",
      })
    );
    await setSession({ nonce, redirectUri });

    const queryParameters = new URLSearchParams({
      state,
      ...parameterObject,
      redirect_uri: redirectUri,
    });

    return `${parsedConfig.authorizationEndpoint}?${queryParameters.toString()}`;
  };

const getIdToken = async (config: OidcConfig, data: unknown, redirectUri?: string) => {
  if (config.oidcFlowType === OidcFlowType.AuthorizationCode) {
    return getAuthorizationCodeFlowIdToken(config, data);
  }

  if (config.oidcFlowType === OidcFlowType.Implicit) {
    return getImplicitFlowIdToken(data);
  }

  // Hybrid Flow
  return getHybridFlowIdToken(config, data, redirectUri);
};

const getUserInfo =
  (getConfig: GetConnectorConfig): GetUserInfo =>
  // eslint-disable-next-line complexity
  async (data, getSession) => {
    const config = await getConfig(defaultMetadata.id);
    validateConfig<OidcConfig>(config, oidcConfigGuard);
    const parsedConfig = oidcConfigGuard.parse(config);

    assert(
      getSession,
      new ConnectorError(ConnectorErrorCodes.NotImplemented, {
        message: "'getSession' is not implemented.",
      })
    );
    const { nonce: validationNonce, redirectUri } = await getSession();

    const { id_token: idToken } = await getIdToken(parsedConfig, data, redirectUri);

    if (!idToken) {
      throw new ConnectorError(ConnectorErrorCodes.SocialIdTokenInvalid);
    }

    try {
      const { payload } = await jwtVerify(
        idToken,
        createRemoteJWKSet(new URL(parsedConfig.idTokenVerificationConfig.jwksUri)),
        {
          ...parsedConfig.idTokenVerificationConfig,
          audience: parsedConfig.clientId,
        }
      );

      const result = idTokenProfileStandardClaimsGuard.safeParse(payload);

      if (!result.success) {
        throw new ConnectorError(ConnectorErrorCodes.SocialIdTokenInvalid);
      }

      const {
        sub: id,
        name,
        picture,
        email,
        email_verified,
        phone,
        phone_verified,
        nonce,
      } = result.data;

      if (nonce) {
        // TODO @darcy: need to specify error code
        assert(
          validationNonce,
          new ConnectorError(ConnectorErrorCodes.General, {
            message: "'nonce' not presented in session storage.",
          })
        );

        assert(
          validationNonce === nonce,
          new ConnectorError(ConnectorErrorCodes.SocialIdTokenInvalid, {
            message: "IdToken validation failed due to 'nonce' mismatch.",
          })
        );
      }

      return {
        id,
        name: conditional(name),
        avatar: conditional(picture),
        email: conditional(email_verified && email),
        phone: conditional(phone_verified && phone),
      };
    } catch (error: unknown) {
      if (error instanceof HTTPError) {
        throw new ConnectorError(ConnectorErrorCodes.General, JSON.stringify(error.response.body));
      }

      throw error;
    }
  };

const createOidcConnector: CreateConnector<SocialConnector> = async ({ getConfig }) => {
  return {
    metadata: defaultMetadata,
    type: ConnectorType.Social,
    configGuard: oidcConfigGuard,
    getAuthorizationUri: getAuthorizationUri(getConfig),
    getUserInfo: getUserInfo(getConfig),
  };
};

export default createOidcConnector;
