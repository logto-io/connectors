import {
  scopePostProcessor,
  implicitFlowResponsePostProcessor,
  hybridFlowResponsePostProcessor,
} from './types';

describe('scopePostProcessor', () => {
  it('`openid` will be added if not exists (with empty string)', () => {
    expect(scopePostProcessor('')).toEqual('openid');
  });

  it('`openid` will be added if not exists (with non-empty string)', () => {
    expect(scopePostProcessor('profile')).toEqual('profile openid');
  });

  it('return original input if openid exists', () => {
    expect(scopePostProcessor('profile openid')).toEqual('profile openid');
  });
});

describe('implicitFlowResponsePostProcessor', () => {
  it('return fully space-deliminated response type', () => {
    expect(implicitFlowResponsePostProcessor('')).toEqual('id_token token');
  });

  it('throws when required `id_token` is not presented', () => {
    expect(() => implicitFlowResponsePostProcessor('token')).toThrow();
  });

  it('throws when invalid type is not presented', () => {
    expect(() => implicitFlowResponsePostProcessor('id_token hello')).toThrow();
  });

  it('return original response type', () => {
    expect(implicitFlowResponsePostProcessor('id_token')).toEqual('id_token');
  });
});

describe('hybridFlowResponsePostProcessor', () => {
  it('return fully space-deliminated response type', () => {
    expect(hybridFlowResponsePostProcessor('')).toEqual('id_token code token');
  });

  it('throws when required `code` is not presented', () => {
    expect(() => hybridFlowResponsePostProcessor('id_token token')).toThrow();
  });

  it('throws when invalid type is not presented', () => {
    expect(() => hybridFlowResponsePostProcessor('code hello')).toThrow();
  });

  it('throws when `token` or `id_token` is not presented', () => {
    expect(() => hybridFlowResponsePostProcessor('code')).toThrow();
  });

  it('return original response type', () => {
    expect(hybridFlowResponsePostProcessor('id_token code token')).toEqual('id_token code token');
  });
});
