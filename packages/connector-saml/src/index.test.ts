import createConnector, { validateSamlAssertion } from './index.js';
import { mockAttributes, mockedConfig, mockSamlResponse } from './mock.js';

const { jest } = import.meta;

const getConfig = jest.fn().mockResolvedValue(mockedConfig);

const setSession = jest.fn();
const getSession = jest.fn();

const connector = await createConnector({ getConfig });

describe('getAuthorizationUri', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a valid uri and save required information to storage', async () => {
    await connector.getAuthorizationUri(
      {
        state: 'some_state',
        redirectUri: 'http://localhost:3000/callback',
        connectorId: 'connector_id',
        connectorFactoryId: 'saml',
        jti: 'jti',
        headers: {},
      },
      setSession
    );
    expect(setSession).toHaveBeenCalledWith({
      state: 'some_state',
      redirectUri: 'http://localhost:3000/callback',
      connectorId: 'connector_id',
      connectorFactoryId: 'saml',
      jti: 'jti',
    });
  });
});

describe('validateSamlAssertion', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should return right redirectUri', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-01-18T14:55:45.406Z'));
    getSession.mockResolvedValue({
      connectorFactoryId: 'saml',
      state: 'some_state',
      redirectUri: 'http://localhost:3000/callback',
    });
    const redirectUri = await validateSamlAssertion(getConfig)(
      {
        body: {
          SAMLResponse: mockSamlResponse,
          RelayState: 'jti',
        },
      },
      getSession,
      setSession
    );
    expect(setSession).toHaveBeenCalledWith(expect.anything());
    expect(redirectUri).toEqual('http://localhost:3000/callback?state=some_state');
    jest.useRealTimers();
  });
});

describe('getUserInfo', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get right profile', async () => {
    getSession.mockResolvedValue({ extractedRawProfile: mockAttributes });
    const userInfo = await connector.getUserInfo(undefined, getSession);
    expect(userInfo).toEqual({
      avatar: 'https://logto.io/logo.4667af9d.svg',
      email: 'test@logto.io',
      id: 'google-oauth2|u98ewdsah9annkjsn',
      name: 'saml test',
    });
  });
});
