export const mockedConfig = {
  entityID: 'urn:dev-hx6tdm0h0i5k4bok.us.auth0.com',
  profileMap: {
    id: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
    name: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
    email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
    avatar: 'http://schemas.auth0.com/picture',
  },
  idpMetadataXml:
    '<EntityDescriptor entityID="urn:dev-hx6tdm0h0i5k4bok.us.auth0.com" xmlns="urn:oasis:names:tc:SAML:2.0:metadata"><IDPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol"><KeyDescriptor use="signing"><KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#"><X509Data><X509Certificate>MIIDHTCCAgWgAwIBAgIJTaPumccdOlssMA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNVBAMTIWRldi1oeDZ0ZG0waDBpNWs0Ym9rLnVzLmF1dGgwLmNvbTAeFw0yMzAxMDgxMTQzMjRaFw0zNjA5MTYxMTQzMjRaMCwxKjAoBgNVBAMTIWRldi1oeDZ0ZG0waDBpNWs0Ym9rLnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMT8B04Kvq6RzVKTDaQzMOdYwrrdaVb5gKyCKeYHH9JTY8L0jbmGPmyz9+1z4N8ol6yi+hb9DwMaQxSMLXwFwOD8+/LWdai8q8jOpOTjXyta8WacyRT1XfhzB2NS1wPSxawnJgyYlw3/zaLJYOhja6Ns18Kr/MOqiimfGEP7mYxB8Y7aSfjdj6mXhBuFv4vPWfaAUe/i46jf6wU92q1HxDEni4pefkZcwuCQTGaU7X+U8wS31tul8VFtcRMRllkucxdAxK5PbqHGHdLrCBzbhTQvpr88UOehuepgbWg/S9EO1kxpR9CcnwKLQ5kXcVK9jR9cq5LmDV67voi4t19wR8kCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUDn6uQOpIM+3LN5DZ4npDAQhJ0iAwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQBGJF0UjVmqOJ/vgRG9y6HK3M+oOxvKzy6kM5cB1Dw66igbdaGLk9C2D6feJFJLH9LW7b8YBKCSEChiy+QXBZ4zBgeTvO7JEleB4hpMV7nLbufp1hCkyIiV/Mi+6fYEYzWBiI8CKKNXuXn2e8UYZ5y1i7yzss8Ixy7AMrmOfP8LHrC/B9FY62drOCtekkGpnHM5Zz9dlaakgwOM+IXLlyfQmcFPy9pPv09k4mb0gvtSvIp8GkTi6U9DLPpjyLAHvF9VS4RGl/idbtOTTlxWxxFKEHYy2q4KQ8bnDDUeP4Hde8PzwXeK2GNu1a0KHlCpISTejY1jel7/YMPLKwg+Iau7</X509Certificate></X509Data></KeyInfo></KeyDescriptor><SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://dev-hx6tdm0h0i5k4bok.us.auth0.com/samlp/8PKtNWlibdgD5vBPbAVtGInVQTHXbhGB/logout"/><SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://dev-hx6tdm0h0i5k4bok.us.auth0.com/samlp/8PKtNWlibdgD5vBPbAVtGInVQTHXbhGB/logout"/><NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</NameIDFormat><NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:persistent</NameIDFormat><NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</NameIDFormat><SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://dev-hx6tdm0h0i5k4bok.us.auth0.com/samlp/8PKtNWlibdgD5vBPbAVtGInVQTHXbhGB"/><SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://dev-hx6tdm0h0i5k4bok.us.auth0.com/samlp/8PKtNWlibdgD5vBPbAVtGInVQTHXbhGB"/><Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri" FriendlyName="E-Mail Address" xmlns="urn:oasis:names:tc:SAML:2.0:assertion"/><Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri" FriendlyName="Given Name" xmlns="urn:oasis:names:tc:SAML:2.0:assertion"/><Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri" FriendlyName="Name" xmlns="urn:oasis:names:tc:SAML:2.0:assertion"/><Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri" FriendlyName="Surname" xmlns="urn:oasis:names:tc:SAML:2.0:assertion"/><Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri" FriendlyName="Name ID" xmlns="urn:oasis:names:tc:SAML:2.0:assertion"/></IDPSSODescriptor></EntityDescriptor>',
  signInEndpoint:
    'https://dev-hx6tdm0h0i5k4bok.us.auth0.com/samlp/8PKtNWlibdgD5vBPbAVtGInVQTHXbhGB',
  x509Certificate:
    '-----BEGIN CERTIFICATE-----MIIDHTCCAgWgAwIBAgIJTaPumccdOlssMA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNVBAMTIWRldi1oeDZ0ZG0waDBpNWs0Ym9rLnVzLmF1dGgwLmNvbTAeFw0yMzAxMDgxMTQzMjRaFw0zNjA5MTYxMTQzMjRaMCwxKjAoBgNVBAMTIWRldi1oeDZ0ZG0waDBpNWs0Ym9rLnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMT8B04Kvq6RzVKTDaQzMOdYwrrdaVb5gKyCKeYHH9JTY8L0jbmGPmyz9+1z4N8ol6yi+hb9DwMaQxSMLXwFwOD8+/LWdai8q8jOpOTjXyta8WacyRT1XfhzB2NS1wPSxawnJgyYlw3/zaLJYOhja6Ns18Kr/MOqiimfGEP7mYxB8Y7aSfjdj6mXhBuFv4vPWfaAUe/i46jf6wU92q1HxDEni4pefkZcwuCQTGaU7X+U8wS31tul8VFtcRMRllkucxdAxK5PbqHGHdLrCBzbhTQvpr88UOehuepgbWg/S9EO1kxpR9CcnwKLQ5kXcVK9jR9cq5LmDV67voi4t19wR8kCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUDn6uQOpIM+3LN5DZ4npDAQhJ0iAwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQBGJF0UjVmqOJ/vgRG9y6HK3M+oOxvKzy6kM5cB1Dw66igbdaGLk9C2D6feJFJLH9LW7b8YBKCSEChiy+QXBZ4zBgeTvO7JEleB4hpMV7nLbufp1hCkyIiV/Mi+6fYEYzWBiI8CKKNXuXn2e8UYZ5y1i7yzss8Ixy7AMrmOfP8LHrC/B9FY62drOCtekkGpnHM5Zz9dlaakgwOM+IXLlyfQmcFPy9pPv09k4mb0gvtSvIp8GkTi6U9DLPpjyLAHvF9VS4RGl/idbtOTTlxWxxFKEHYy2q4KQ8bnDDUeP4Hde8PzwXeK2GNu1a0KHlCpISTejY1jel7/YMPLKwg+Iau7-----END CERTIFICATE-----',
  signAuthnRequest: false,
  assertionConsumerServiceUrl: 'http://localhost:3000/api/saml-assertion-handler/connectorId',
};

export const mockAttributes = {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier':
    'google-oauth2|u98ewdsah9annkjsn',
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': 'test@logto.io',
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': 'saml test',
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname': 'saml',
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname': 'test',
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn': 'test@logto.io',
  'http://schemas.auth0.com/identities/default/provider': 'google-oauth2',
  'http://schemas.auth0.com/identities/default/connection': 'google-oauth2',
  'http://schemas.auth0.com/identities/default/isSocial': 'true',
  'http://schemas.auth0.com/clientID': '8PKtNWlibdgD5vBPbAVtGInVQTHXbhGB',
  'http://schemas.auth0.com/created_at':
    'Sat Jan 14 2023 18:55:15 GMT+0000 (Coordinated Universal Time)',
  'http://schemas.auth0.com/email_verified': 'true',
  'http://schemas.auth0.com/locale': 'en',
  'http://schemas.auth0.com/nickname': 'test',
  'http://schemas.auth0.com/picture': 'https://logto.io/logo.4667af9d.svg',
  'http://schemas.auth0.com/updated_at':
    'Sat Jan 14 2023 18:55:15 GMT+0000 (Coordinated Universal Time)',
};
