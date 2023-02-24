import type { ConnectorConfigFormItem, ConnectorMetadata } from '@logto/connector-kit';
import { ConnectorPlatform, ConnectorConfigFormItemType } from '@logto/connector-kit';

export const formItems: ConnectorConfigFormItem[] = [
  {
    type: ConnectorConfigFormItemType.Text,
    label: 'entityID',
    key: 'entityID',
    required: true,
  },
  {
    type: ConnectorConfigFormItemType.Text,
    label: 'signInEndpoint',
    key: 'signInEndpoint',
    required: true,
  },
  {
    type: ConnectorConfigFormItemType.MultilineText,
    label: 'x509Certificate',
    key: 'x509Certificate',
    required: true,
    placeholder:
      '-----BEGIN CERTIFICATE-----\nMIIDHTCCAgWg[...]jel7/YMPLKwg+Iau7\n-----END CERTIFICATE-----',
  },
  {
    type: ConnectorConfigFormItemType.MultilineText,
    label: 'idpMetadataXml',
    key: 'idpMetadataXml',
    required: true,
  },
  {
    type: ConnectorConfigFormItemType.Text,
    label: 'Assertion Consumer Service URL',
    key: 'assertionConsumerServiceUrl',
    required: true,
    description:
      'Copy and paste the unique Assertion Consumer Service URL (ACS URL) into the {{Connector Name}} provider configuration. It will take effect after the connector is created.',
  },
  {
    type: ConnectorConfigFormItemType.Select,
    label: 'requestSignatureAlgorithm',
    key: 'requestSignatureAlgorithm',
    selectItems: [
      { value: 'http://www.w3.org/2000/09/xmldsig#rsa-sha1', title: 'RSA SHA1' },
      {
        value: 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256',
        title: 'RSA SHA256',
      },
      {
        value: 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha512',
        title: 'RSA SHA512',
      },
    ],
    defaultValue: 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256',
  },
  {
    type: ConnectorConfigFormItemType.Select,
    label: 'messageSigningOrder',
    key: 'messageSigningOrder',
    selectItems: [
      { value: 'sign-then-encrypt', title: 'Sign then encrypt' },
      {
        value: 'encrypt-then-sign',
        title: 'Encrypt then sign',
      },
    ],
    defaultValue: 'sign-then-encrypt',
  },
  {
    type: ConnectorConfigFormItemType.Switch,
    label: 'signAuthnRequest',
    key: 'signAuthnRequest',
    defaultValue: false,
  },
  {
    type: ConnectorConfigFormItemType.MultilineText,
    label: 'privateKey',
    key: 'privateKey',
    required: true,
    showConditions: [{ targetKey: 'signAuthnRequest', expectValue: true }],
    placeholder:
      '-----BEGIN RSA PRIVATE KEY-----\n[private-key-content]\n-----END RSA PRIVATE KEY-----',
  },
  {
    type: ConnectorConfigFormItemType.Text,
    label: 'privateKeyPass',
    key: 'privateKeyPass',
    showConditions: [{ targetKey: 'signAuthnRequest', expectValue: true }],
  },
  {
    type: ConnectorConfigFormItemType.Switch,
    label: 'encryptAssertion',
    key: 'encryptAssertion',
    defaultValue: false,
  },
  {
    type: ConnectorConfigFormItemType.MultilineText,
    label: 'encPrivateKey',
    key: 'encPrivateKey',
    required: true,
    showConditions: [{ targetKey: 'encryptAssertion', expectValue: true }],
    placeholder:
      '-----BEGIN RSA PRIVATE KEY-----\n[private-key-content]\n-----END RSA PRIVATE KEY-----',
  },
  {
    type: ConnectorConfigFormItemType.Text,
    label: 'encPrivateKeyPass',
    key: 'encPrivateKeyPass',
    showConditions: [{ targetKey: 'encryptAssertion', expectValue: true }],
  },
  {
    type: ConnectorConfigFormItemType.Select,
    label: 'nameIDFormat',
    key: 'nameIDFormat',
    selectItems: [
      { value: 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified', title: 'Unspecified' },
      {
        value: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
        title: 'EmailAddress',
      },
      {
        value: 'urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName',
        title: 'x590SubjectName',
      },
      {
        value: 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
        title: 'Persistent',
      },
      {
        value: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
        title: 'Transient',
      },
    ],
    defaultValue: 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified',
  },
  {
    type: ConnectorConfigFormItemType.Number,
    label: 'timeout',
    key: 'timeout',
    defaultValue: 5000,
  },
  {
    type: ConnectorConfigFormItemType.Json,
    label: 'profileMap',
    key: 'profileMap',
    defaultValue: {
      id: 'id',
      email: 'email',
      phone: 'phone',
      name: 'name',
      avatar: 'avatar',
    },
    required: false,
  },
];

export const defaultMetadata: ConnectorMetadata = {
  id: 'saml',
  target: 'saml',
  platform: ConnectorPlatform.Universal,
  name: {
    en: 'SAML',
    'zh-CN': 'SAML',
  },
  logo: './logo.svg',
  logoDark: null,
  description: {
    en: 'SAML is an XML based framework that stands for Security Assertion Markup Language. It can be used for authentication.',
    'zh-CN':
      '安全断言标记语言 SAML 是一个基于 XML 的开源标准数据格式，它可用于在当事方之间交换身份验证和授权数据。',
  },
  readme: './README.md',
  isStandard: true,
  formItems,
};

export const defaultTimeout = 10_000;

export const authnRequestBinding = ['HTTP-Redirect'] as const;

export const assertionBinding = ['HTTP-POST'] as const;

export const messageSigningOrders = ['sign-then-encrypt', 'encrypt-then-sign'] as const;
