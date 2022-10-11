import createConnector from '.';
import {
  mockedConfig,
  mockedOauth2AuthWithKey,
  mockedOauth2AuthWithToken,
  mockedTlsOptionsWithTls,
  mockedTlsOptionsWithoutTls,
  mockedConnectionOptionsValid,
  mockedConnectionOptionsInvalid,
  mockedDebuggingOptions,
  mockedSecurityOptions,
  mockedProxyOptions,
} from './mock';
import { smtpConfigGuard } from './types';

const getConfig = jest.fn().mockResolvedValue(mockedConfig);

describe('SMTP connector', () => {
  it('init without throwing errors', async () => {
    await expect(createConnector({ getConfig })).resolves.not.toThrow();
  });
});

describe('Test config guard', () => {
  it('basic config', () => {
    const result = smtpConfigGuard.safeParse(mockedConfig);
    expect(result.success && result.data).toMatchObject(expect.objectContaining(mockedConfig));
  });

  it('config with oauth2 auth (private key needed)', () => {
    const testConfig = { ...mockedConfig, auth: mockedOauth2AuthWithKey };
    const result = smtpConfigGuard.safeParse(testConfig);
    expect(result.success && result.data).toMatchObject(expect.objectContaining(testConfig));
  });

  it('config with oauth2 auth (token needed)', () => {
    const testConfig = { ...mockedConfig, auth: mockedOauth2AuthWithToken };
    const result = smtpConfigGuard.safeParse(testConfig);
    expect(result.success && result.data).toMatchObject(expect.objectContaining(testConfig));
  });

  it('config with tls options (with additional `tls` configuration)', () => {
    const testConfig = { ...mockedConfig, ...mockedTlsOptionsWithTls };
    const result = smtpConfigGuard.safeParse(testConfig);
    expect(result.success && result.data).toMatchObject(
      expect.objectContaining(mockedTlsOptionsWithTls)
    );
  });

  it('config with tls options (without additional `tls` configuration)', () => {
    const testConfig = { ...mockedConfig, ...mockedTlsOptionsWithoutTls };
    const result = smtpConfigGuard.safeParse(testConfig);
    expect(result.success && result.data).toMatchObject(expect.objectContaining(mockedConfig));
  });

  it('config with VALID connection options', () => {
    const testConfig = { ...mockedConfig, ...mockedConnectionOptionsValid };
    const result = smtpConfigGuard.safeParse(testConfig);
    expect(result.success && result.data).toMatchObject(expect.objectContaining(testConfig));
  });

  it('config with INVALID connection options', () => {
    const testConfig = { ...mockedConfig, ...mockedConnectionOptionsInvalid };
    const result = smtpConfigGuard.safeParse(testConfig);
    expect(result.success && result.data).toMatchObject(expect.objectContaining(mockedConfig));
  });

  it('config with debugging, security and proxy options', () => {
    const testConfig = {
      ...mockedConfig,
      ...mockedDebuggingOptions,
      ...mockedSecurityOptions,
      ...mockedProxyOptions,
    };
    const result = smtpConfigGuard.safeParse(testConfig);
    expect(result.success && result.data).toMatchObject(expect.objectContaining(testConfig));
  });
});
