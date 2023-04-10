import { ConnectorError, ConnectorErrorCodes } from '@logto/connector-kit';
import nock from 'nock';

import { accessTokenEndpoint, authorizationEndpoint, userInfoEndpoint } from './constant.js';
import createConnector, { getAccessToken } from './index.js';
import { mockedConfig } from './mock.js';

const { jest } = import.meta;

const getConfig = jest.fn().mockResolvedValue(mockedConfig);

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
    expect(authorizationUri).toEqual(
      `${authorizationEndpoint}?appid=%3Capp-id%3E&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fcallback&response_type=code&scope=snsapi_login&state=some_state`
    );
  });
});

describe('getAccessToken', () => {
  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  const accessTokenEndpointUrl = new URL(accessTokenEndpoint);
  const parameters = new URLSearchParams({
    appid: '<app-id>',
    secret: '<app-secret>',
    code: 'code',
    grant_type: 'authorization_code',
  });

  it('should get an accessToken by exchanging with code', async () => {
    nock(accessTokenEndpointUrl.origin)
      .get(accessTokenEndpointUrl.pathname)
      .query(parameters)
      .reply(200, {
        access_token: 'access_token',
        openid: 'openid',
      });
    const { accessToken, openid } = await getAccessToken('code', mockedConfig);
    expect(accessToken).toEqual('access_token');
    expect(openid).toEqual('openid');
  });

  it('throws SocialAuthCodeInvalid error if errcode is 40029', async () => {
    const error = { errcode: 40_029, errmsg: 'invalid code' };
    nock(accessTokenEndpointUrl.origin)
      .get(accessTokenEndpointUrl.pathname)
      .query(parameters)
      .reply(200, error);
    await expect(getAccessToken('code', mockedConfig)).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.SocialAuthCodeInvalid, error)
    );
  });

  it('throws SocialAuthCodeInvalid error if errcode is 40163', async () => {
    const error = { errcode: 40_163, errmsg: 'code been used' };
    nock(accessTokenEndpointUrl.origin)
      .get(accessTokenEndpointUrl.pathname)
      .query(true)
      .reply(200, error);
    await expect(getAccessToken('code', mockedConfig)).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.SocialAuthCodeInvalid, error)
    );
  });

  it('throws error with message otherwise', async () => {
    const error = { errcode: -1, errmsg: 'system error' };
    nock(accessTokenEndpointUrl.origin)
      .get(accessTokenEndpointUrl.pathname)
      .query(true)
      .reply(200, error);
    await expect(getAccessToken('wrong_code', mockedConfig)).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.General, error)
    );
  });
});

const nockNoOpenIdAccessTokenResponse = () => {
  const accessTokenEndpointUrl = new URL(accessTokenEndpoint);
  nock(accessTokenEndpointUrl.origin).get(accessTokenEndpointUrl.pathname).query(true).reply(200, {
    access_token: 'access_token',
  });
};

describe('getUserInfo', () => {
  beforeEach(() => {
    const accessTokenEndpointUrl = new URL(accessTokenEndpoint);
    const parameters = new URLSearchParams({
      appid: '<app-id>',
      secret: '<app-secret>',
      code: 'code',
      grant_type: 'authorization_code',
    });

    nock(accessTokenEndpointUrl.origin)
      .get(accessTokenEndpointUrl.pathname)
      .query(parameters)
      .reply(200, {
        access_token: 'access_token',
        openid: 'openid',
      });
  });

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  const userInfoEndpointUrl = new URL(userInfoEndpoint);
  const parameters = new URLSearchParams({ access_token: 'access_token', openid: 'openid' });

  it('should get valid SocialUserInfo', async () => {
    nock(userInfoEndpointUrl.origin).get(userInfoEndpointUrl.pathname).query(parameters).reply(0, {
      unionid: 'this_is_an_arbitrary_wechat_union_id',
      headimgurl: 'https://github.com/images/error/octocat_happy.gif',
      nickname: 'wechat bot',
    });
    const connector = await createConnector({ getConfig });
    const socialUserInfo = await connector.getUserInfo(
      {
        code: 'code',
      },
      jest.fn()
    );
    expect(socialUserInfo).toMatchObject({
      id: 'this_is_an_arbitrary_wechat_union_id',
      avatar: 'https://github.com/images/error/octocat_happy.gif',
      name: 'wechat bot',
    });
  });

  it('throws General error if code not provided in input', async () => {
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({}, jest.fn())).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.General, '{}')
    );
  });

  it('throws error if `openid` is missing', async () => {
    const error = {
      errcode: 41_009,
      errmsg: 'missing openid',
    };
    nockNoOpenIdAccessTokenResponse();
    nock(userInfoEndpointUrl.origin)
      .get(userInfoEndpointUrl.pathname)
      .query(parameters)
      .reply(200, error);
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({ code: 'code' }, jest.fn())).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.General, error)
    );
  });

  it('throws SocialAccessTokenInvalid error if errcode is 40001', async () => {
    const error = { errcode: 40_001, errmsg: 'invalid credential' };
    nock(userInfoEndpointUrl.origin)
      .get(userInfoEndpointUrl.pathname)
      .query(parameters)
      .reply(200, error);
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({ code: 'code' }, jest.fn())).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.SocialAccessTokenInvalid, error)
    );
  });

  it('throws unrecognized error', async () => {
    nock(userInfoEndpointUrl.origin).get(userInfoEndpointUrl.pathname).query(parameters).reply(500);
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({ code: 'code' }, jest.fn())).rejects.toThrow();
  });

  it('throws Error if request failed and errcode is not 40001', async () => {
    const error = { errcode: 40_003, errmsg: 'invalid openid' };
    nock(userInfoEndpointUrl.origin)
      .get(userInfoEndpointUrl.pathname)
      .query(parameters)
      .reply(200, error);
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({ code: 'code' }, jest.fn())).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.General, error)
    );
  });

  it('throws SocialAccessTokenInvalid error if response code is 401', async () => {
    nock(userInfoEndpointUrl.origin).get(userInfoEndpointUrl.pathname).query(parameters).reply(401);
    const connector = await createConnector({ getConfig });
    await expect(connector.getUserInfo({ code: 'code' }, jest.fn())).rejects.toMatchError(
      new ConnectorError(ConnectorErrorCodes.General, JSON.stringify({ body: '', statusCode: 401 }))
    );
  });
});
