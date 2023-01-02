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
import { assert, conditional, pick } from '@silverhand/essentials';
import { HTTPError } from 'got';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import snakecaseKeys from 'snakecase-keys';

import { defaultMetadata } from './constant.js';
import type { OidcConfig } from './types.js';
import { idTokenProfileStandardClaimsGuard, oidcConfigGuard, OidcFlowType } from './types.js';
import {
  buildIdGenerator,
  isIdTokenInResponseType,
  getAuthorizationCodeFlowIdToken,
  getImplicitFlowIdToken,
  getHybridFlowIdToken,
} from './utils.js';

const generateNonce = () => buildIdGenerator(12)();

const getAuthorizationUri =
  (getConfig: GetConnectorConfig): GetAuthorizationUri =>
  async ({ state, redirectUri }, setSession) => {
    const config = await getConfig(defaultMetadata.id);
    validateConfig<OidcConfig>(config, oidcConfigGuard);
    const parsedConfig = oidcConfigGuard.parse(config);

    const nonce = generateNonce();
    const needNonce = isIdTokenInResponseType(parsedConfig.responseType);

    assert(
      setSession,
      new ConnectorError(ConnectorErrorCodes.NotImplemented, {
        message: 'Function `setSession()` is not implemented',
      })
    );
    await setSession({ nonce, redirectUri });

    const { customConfig, authRequestOptionalConfig, ...rest } = parsedConfig;

    const queryParameters = new URLSearchParams({
      state,
      ...snakecaseKeys({
        ...pick(rest, 'responseType', 'scope', 'clientId'),
        ...authRequestOptionalConfig,
        ...customConfig,
      }),
      ...(needNonce ? { nonce } : {}),
      redirect_uri: redirectUri,
    });

    return `${parsedConfig.authorizationEndpoint}?${queryParameters.toString()}`;
  };

const getIdToken = async (config: OidcConfig, data: unknown, redirectUri?: string) => {
  if (config.oidcFlowType === OidcFlowType.AuthorizationCode) {
    return getAuthorizationCodeFlowIdToken(config, data, redirectUri);
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
        message: 'Function `getSession()` is not implemented.',
      })
    );
    const { nonce: validationNonce, redirectUri } = await getSession();

    const { id_token: idToken } = await getIdToken(parsedConfig, data, redirectUri);

    if (!idToken) {
      throw new ConnectorError(ConnectorErrorCodes.SocialIdTokenInvalid, {
        message: 'Cannot find ID Token.',
      });
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
        throw new ConnectorError(ConnectorErrorCodes.SocialIdTokenInvalid, result.error);
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
            message: 'Cannot find `nonce` in session storage.',
          })
        );

        assert(
          validationNonce === nonce,
          new ConnectorError(ConnectorErrorCodes.SocialIdTokenInvalid, {
            message: 'ID Token validation failed due to `nonce` mismatch.',
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
