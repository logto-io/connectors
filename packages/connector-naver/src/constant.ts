import { ConnectorMetadata, ConnectorPlatform } from '@logto/connector-kit';

export const authorizationEndpoint = 'https://nid.naver.com/oauth2.0/authorize';
export const accessTokenEndpoint = 'https://nid.naver.com/oauth2.0/token';
export const userInfoEndpoint = 'https://openapi.naver.com/v1/nid/me';

export const defaultMetadata: ConnectorMetadata = {
  id: 'naver-universal',
  target: 'naver',
  platform: ConnectorPlatform.Universal,
  name: {
    en: 'Naver',
    'zh-CN': 'Naver',
    'tr-TR': 'Naver',
    'ko-KR': '네이버',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: 'Naver is the most leading internet service provider in South Korea',
    'zh-CN': 'Naver is the most leading internet service provider in South Korea',
    'tr-TR': 'Naver is the most leading internet service provider in South Korea',
    'ko-KR': '네이버는 한국에서 가장 선도적인 인터넷 서비스 제공자 입니다.',
  },
  readme: './README.md',
  configTemplate: './docs/config-template.json',
};

export const defaultTimeout = 5000;
