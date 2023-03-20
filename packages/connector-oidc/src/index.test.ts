import nock from 'nock';

import { mockConfig } from './mock.js';

const { jest } = import.meta;

const getConfig = jest.fn().mockResolvedValue(mockConfig);

const jwtVerify = jest.fn();

jest.unstable_mockModule('jose', () => ({
  jwtVerify,
  createRemoteJWKSet: jest.fn(),
}));

const { default: createConnector } = await import('./index.js');

describe('getAuthorizationUri', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a valid uri by redirectUri and state', async () => {
    const connector = await createConnector({ getConfig });
    const authorizationUri = await connector.getAuthorizationUri(
      {
        state: 'some_state',
        redirectUri: 'http://localhost:3001/callback',
        connectorId: 'some_connector_id',
        connectorFactoryId: 'some_connector_factory_id',
        jti: 'some_jti',
        headers: {},
      },
      jest.fn()
    );

    const { origin, pathname, searchParams } = new URL(authorizationUri);
    expect(origin + pathname).toEqual(mockConfig.authorizationEndpoint);
    expect(searchParams.get('client_id')).toEqual(mockConfig.clientId);
    expect(searchParams.get('redirect_uri')).toEqual('http://localhost:3001/callback');
    expect(searchParams.get('state')).toEqual('some_state');
    expect(searchParams.get('response_type')).toEqual('code');
    expect(searchParams.get('scope')).toEqual(mockConfig.scope);
    expect(searchParams.has('nonce')).toBeTruthy();
  });
});

describe('getUserInfo', () => {
  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  it('should get valid userInfo', async () => {
    const userId = 'userId';
    const mockJwtVerify = jwtVerify;
    mockJwtVerify.mockImplementationOnce(() => ({
      payload: { sub: userId, nonce: 'nonce' },
    }));
    const tokenEndpointUrl = new URL(mockConfig.tokenEndpoint);
    nock(tokenEndpointUrl.origin).post(tokenEndpointUrl.pathname).query(true).reply(200, {
      id_token: 'id_token',
      access_token: 'access_token',
    });
    const connector = await createConnector({ getConfig });
    const userInfo = await connector.getUserInfo(
      { code: 'code' },
      jest.fn().mockImplementationOnce(() => {
        return { nonce: 'nonce', redirectUri: 'http://localhost:3001/callback' };
      })
    );
    expect(userInfo).toEqual({ id: userId });
  });
});
