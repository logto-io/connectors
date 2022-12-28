import { ConnectorError, ConnectorErrorCodes } from '@logto/connector-kit';
import { jwtVerify } from 'jose';

import createConnector from '.';
import { authorizationEndpoint } from './constant';
import { mockedConfig } from './mock';

const getConfig = jest.fn().mockResolvedValue(mockedConfig);

jest.mock('jose', () => ({
  jwtVerify: jest.fn(),
  createRemoteJWKSet: jest.fn(),
}));

describe('getAuthorizationUri', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a valid uri by redirectUri and state', async () => {
    const connector = await createConnector({ getConfig });
    const setSession = jest.fn();
    const authorizationUri = await connector.getAuthorizationUri(
      {
        state: 'some_state',
        redirectUri: 'http://localhost:3000/callback',
      },
      setSession
    );

    const { origin, pathname, searchParams } = new URL(authorizationUri);
    expect(origin + pathname).toEqual(authorizationEndpoint);
    expect(searchParams.get('client_id')).toEqual('<client-id>');
    expect(searchParams.get('redirect_uri')).toEqual('http://localhost:3000/callback');
    expect(searchParams.get('state')).toEqual('some_state');
    expect(searchParams.get('response_type')).toEqual('code id_token');
    expect(searchParams.get('response_mode')).toEqual('fragment');
    expect(searchParams.has('scope')).toBeTruthy();
    expect(searchParams.has('nonce')).toBeTruthy();
  });
});

describe('getUserInfo', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should get user info from id token payload', async () => {
    const userId = 'userId';
    const mockJwtVerify = jwtVerify as jest.Mock;
    mockJwtVerify.mockImplementationOnce(() => ({ payload: { sub: userId } }));
    const connector = await createConnector({ getConfig });
    const userInfo = await connector.getUserInfo({ id_token: 'idToken' });
    expect(userInfo).toEqual({ id: userId });
  });

  it('should throw if id token is missing', async () => {
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({})).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.General, '{}')
    );
  });

  it('should throw if verify id token failed', async () => {
    const mockJwtVerify = jwtVerify as jest.Mock;
    mockJwtVerify.mockImplementationOnce(() => {
      throw new Error('jwtVerify failed');
    });
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({ id_token: 'id_token' })).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.SocialIdTokenInvalid)
    );
  });

  it('should throw if the id token payload does not contains sub', async () => {
    const mockJwtVerify = jwtVerify as jest.Mock;
    mockJwtVerify.mockImplementationOnce(() => ({
      payload: { iat: 123_456 },
    }));
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({ id_token: 'id_token' })).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.SocialIdTokenInvalid)
    );
  });
});
