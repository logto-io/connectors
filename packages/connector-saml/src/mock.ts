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

export const mockSamlResponse =
  'PHNhbWxwOlJlc3BvbnNlIHhtbG5zOnNhbWxwPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6cHJvdG9jb2wiIElEPSJfYjVjMTllM2E0OTBkMzg0ZDRlYTciICBJblJlc3BvbnNlVG89Il8xNjc0MDUzNzQzMjUzIiAgVmVyc2lvbj0iMi4wIiBJc3N1ZUluc3RhbnQ9IjIwMjMtMDEtMThUMTQ6NTU6NDYuODk1WiIgIERlc3RpbmF0aW9uPSJodHRwOi8vbG9jYWxob3N0OjMwMDEvYXBpL2Fzc2VydGlvbi1oYW5kbGVyL3hscTdMVWtSRlAwbyI+PHNhbWw6SXNzdWVyIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPnVybjpkZXYtaHg2dGRtMGgwaTVrNGJvay51cy5hdXRoMC5jb208L3NhbWw6SXNzdWVyPjxzYW1scDpTdGF0dXM+PHNhbWxwOlN0YXR1c0NvZGUgVmFsdWU9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpzdGF0dXM6U3VjY2VzcyIvPjwvc2FtbHA6U3RhdHVzPjxzYW1sOkFzc2VydGlvbiB4bWxuczpzYW1sPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIiBWZXJzaW9uPSIyLjAiIElEPSJfTzV6M3RtU0xPMFpZRlVnbGtJRnIyaTV1MW5ReWtybjUiIElzc3VlSW5zdGFudD0iMjAyMy0wMS0xOFQxNDo1NTo0Ni44NTFaIj48c2FtbDpJc3N1ZXI+dXJuOmRldi1oeDZ0ZG0waDBpNWs0Ym9rLnVzLmF1dGgwLmNvbTwvc2FtbDpJc3N1ZXI+PFNpZ25hdHVyZSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnIyI+PFNpZ25lZEluZm8+PENhbm9uaWNhbGl6YXRpb25NZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzEwL3htbC1leGMtYzE0biMiLz48U2lnbmF0dXJlTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8wNC94bWxkc2lnLW1vcmUjcnNhLXNoYTI1NiIvPjxSZWZlcmVuY2UgVVJJPSIjX081ejN0bVNMTzBaWUZVZ2xrSUZyMmk1dTFuUXlrcm41Ij48VHJhbnNmb3Jtcz48VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI2VudmVsb3BlZC1zaWduYXR1cmUiLz48VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+PC9UcmFuc2Zvcm1zPjxEaWdlc3RNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGVuYyNzaGEyNTYiLz48RGlnZXN0VmFsdWU+MVlrOUczUnpGR0llVGxmb2JUUkVpaWlHeHBRNjRnRmhrMjlicmR2aDNMbz08L0RpZ2VzdFZhbHVlPjwvUmVmZXJlbmNlPjwvU2lnbmVkSW5mbz48U2lnbmF0dXJlVmFsdWU+aGc4Y0ZNTFEzaGRzbXZXdHVJVHMrdGdjZVJDaG5lMkFxTlZ5cFg5OXU3WUNEenluRjB3ZE92VFdYUHhGaTRsQzFWa3huTlBXbUJrYkE1ZHpOVVRzbDV0NHRURy83NW5KMzYxaVByWHRZU1dVMjQ1cDRtUUNBMWUwdFpYMUplZ081RUJGVmtuUlFRNmlXRnJreXYrd0hqMzVPQ203US9qTTJROVl1bXYwZkpCWkFCY2lmc3dJZHRESTZZTW9wSWt0Uk5BSGZOUi9yYTZ6MDJLUlhoTUJNaEJFeXVFMTJvSUZFOXVWdzBmRi9tTFNKMGNFSGZ2TXc1SDJucUZhNEJidGgreVFNVGJrQ2syU21qKzM1ZGtvTXcrUy9CRGgzYTNERE5DU2tML3QyblJmTTdjbjdZdmlYWTl4ZU9uZE1SclZva2NzOG52RC9MS3l6UkRSLzYxSmt3PT08L1NpZ25hdHVyZVZhbHVlPjxLZXlJbmZvPjxYNTA5RGF0YT48WDUwOUNlcnRpZmljYXRlPk1JSURIVENDQWdXZ0F3SUJBZ0lKVGFQdW1jY2RPbHNzTUEwR0NTcUdTSWIzRFFFQkN3VUFNQ3d4S2pBb0JnTlZCQU1USVdSbGRpMW9lRFowWkcwd2FEQnBOV3MwWW05ckxuVnpMbUYxZEdnd0xtTnZiVEFlRncweU16QXhNRGd4TVRRek1qUmFGdzB6TmpBNU1UWXhNVFF6TWpSYU1Dd3hLakFvQmdOVkJBTVRJV1JsZGkxb2VEWjBaRzB3YURCcE5XczBZbTlyTG5WekxtRjFkR2d3TG1OdmJUQ0NBU0l3RFFZSktvWklodmNOQVFFQkJRQURnZ0VQQURDQ0FRb0NnZ0VCQU1UOEIwNEt2cTZSelZLVERhUXpNT2RZd3JyZGFWYjVnS3lDS2VZSEg5SlRZOEwwamJtR1BteXo5KzF6NE44b2w2eWkraGI5RHdNYVF4U01MWHdGd09EOCsvTFdkYWk4cThqT3BPVGpYeXRhOFdhY3lSVDFYZmh6QjJOUzF3UFN4YXduSmd5WWx3My96YUxKWU9oamE2TnMxOEtyL01PcWlpbWZHRVA3bVl4QjhZN2FTZmpkajZtWGhCdUZ2NHZQV2ZhQVVlL2k0NmpmNndVOTJxMUh4REVuaTRwZWZrWmN3dUNRVEdhVTdYK1U4d1MzMXR1bDhWRnRjUk1SbGxrdWN4ZEF4SzVQYnFIR0hkTHJDQnpiaFRRdnByODhVT2VodWVwZ2JXZy9TOUVPMWt4cFI5Q2Nud0tMUTVrWGNWSzlqUjljcTVMbURWNjd2b2k0dDE5d1I4a0NBd0VBQWFOQ01FQXdEd1lEVlIwVEFRSC9CQVV3QXdFQi96QWRCZ05WSFE0RUZnUVVEbjZ1UU9wSU0rM0xONURaNG5wREFRaEowaUF3RGdZRFZSMFBBUUgvQkFRREFnS0VNQTBHQ1NxR1NJYjNEUUVCQ3dVQUE0SUJBUUJHSkYwVWpWbXFPSi92Z1JHOXk2SEszTStvT3h2S3p5NmtNNWNCMUR3NjZpZ2JkYUdMazlDMkQ2ZmVKRkpMSDlMVzdiOFlCS0NTRUNoaXkrUVhCWjR6QmdlVHZPN0pFbGVCNGhwTVY3bkxidWZwMWhDa3lJaVYvTWkrNmZZRVl6V0JpSThDS0tOWHVYbjJlOFVZWjV5MWk3eXpzczhJeHk3QU1ybU9mUDhMSHJDL0I5Rlk2MmRyT0N0ZWtrR3BuSE01Wno5ZGxhYWtnd09NK0lYTGx5ZlFtY0ZQeTlwUHYwOWs0bWIwZ3Z0U3ZJcDhHa1RpNlU5RExQcGp5TEFIdkY5VlM0UkdsL2lkYnRPVFRseFd4eEZLRUhZeTJxNEtROGJuRERVZVA0SGRlOFB6d1hlSzJHTnUxYTBLSGxDcElTVGVqWTFqZWw3L1lNUExLd2crSWF1NzwvWDUwOUNlcnRpZmljYXRlPjwvWDUwOURhdGE+PC9LZXlJbmZvPjwvU2lnbmF0dXJlPjxzYW1sOlN1YmplY3Q+PHNhbWw6TmFtZUlEIEZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6MS4xOm5hbWVpZC1mb3JtYXQ6dW5zcGVjaWZpZWQiPmdvb2dsZS1vYXV0aDJ8MTE2NDMzNDI0MzQ4NDkzMjE3MTUxPC9zYW1sOk5hbWVJRD48c2FtbDpTdWJqZWN0Q29uZmlybWF0aW9uIE1ldGhvZD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmNtOmJlYXJlciI+PHNhbWw6U3ViamVjdENvbmZpcm1hdGlvbkRhdGEgTm90T25PckFmdGVyPSIyMDIzLTAxLTE4VDE1OjU1OjQ2Ljg1MVoiIFJlY2lwaWVudD0iaHR0cDovL2xvY2FsaG9zdDozMDAxL2FwaS9hc3NlcnRpb24taGFuZGxlci94bHE3TFVrUkZQMG8iIEluUmVzcG9uc2VUbz0iXzE2NzQwNTM3NDMyNTMiLz48L3NhbWw6U3ViamVjdENvbmZpcm1hdGlvbj48L3NhbWw6U3ViamVjdD48c2FtbDpDb25kaXRpb25zIE5vdEJlZm9yZT0iMjAyMy0wMS0xOFQxNDo1NTo0Ni44NTFaIiBOb3RPbk9yQWZ0ZXI9IjIwMjMtMDEtMThUMTU6NTU6NDYuODUxWiI+PHNhbWw6QXVkaWVuY2VSZXN0cmljdGlvbj48c2FtbDpBdWRpZW5jZT51cm46ZGV2LWh4NnRkbTBoMGk1azRib2sudXMuYXV0aDAuY29tPC9zYW1sOkF1ZGllbmNlPjwvc2FtbDpBdWRpZW5jZVJlc3RyaWN0aW9uPjwvc2FtbDpDb25kaXRpb25zPjxzYW1sOkF1dGhuU3RhdGVtZW50IEF1dGhuSW5zdGFudD0iMjAyMy0wMS0xOFQxNDo1NTo0Ni44NTFaIiBTZXNzaW9uSW5kZXg9Il8yM0FqQTdrZElLajJ4YkxJRWRBSl92a1lZOVV4bWpRSSI+PHNhbWw6QXV0aG5Db250ZXh0PjxzYW1sOkF1dGhuQ29udGV4dENsYXNzUmVmPnVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphYzpjbGFzc2VzOnVuc3BlY2lmaWVkPC9zYW1sOkF1dGhuQ29udGV4dENsYXNzUmVmPjwvc2FtbDpBdXRobkNvbnRleHQ+PC9zYW1sOkF1dGhuU3RhdGVtZW50PjxzYW1sOkF0dHJpYnV0ZVN0YXRlbWVudCB4bWxuczp4cz0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEiIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiPjxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDp1cmkiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhzaTp0eXBlPSJ4czpzdHJpbmciPmdvb2dsZS1vYXV0aDJ8MTE2NDMzNDI0MzQ4NDkzMjE3MTUxPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDpBdHRyaWJ1dGU+PHNhbWw6QXR0cmlidXRlIE5hbWU9Imh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDp1cmkiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhzaTp0eXBlPSJ4czpzdHJpbmciPnllbXEuamRAZ21haWwuY29tPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDpBdHRyaWJ1dGU+PHNhbWw6QXR0cmlidXRlIE5hbWU9Imh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiIE5hbWVGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphdHRybmFtZS1mb3JtYXQ6dXJpIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6c3RyaW5nIj5ZZSBNaW5ncWluZzwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT48L3NhbWw6QXR0cmlidXRlPjxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiIE5hbWVGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphdHRybmFtZS1mb3JtYXQ6dXJpIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6c3RyaW5nIj5ZZTwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT48L3NhbWw6QXR0cmlidXRlPjxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OnVyaSI+PHNhbWw6QXR0cmlidXRlVmFsdWUgeHNpOnR5cGU9InhzOnN0cmluZyI+TWluZ3Fpbmc8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvdXBuIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OnVyaSI+PHNhbWw6QXR0cmlidXRlVmFsdWUgeHNpOnR5cGU9InhzOnN0cmluZyI+eWVtcS5qZEBnbWFpbC5jb208L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iaHR0cDovL3NjaGVtYXMuYXV0aDAuY29tL2lkZW50aXRpZXMvZGVmYXVsdC9wcm92aWRlciIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDp1cmkiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhzaTp0eXBlPSJ4czpzdHJpbmciPmdvb2dsZS1vYXV0aDI8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iaHR0cDovL3NjaGVtYXMuYXV0aDAuY29tL2lkZW50aXRpZXMvZGVmYXVsdC9jb25uZWN0aW9uIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OnVyaSI+PHNhbWw6QXR0cmlidXRlVmFsdWUgeHNpOnR5cGU9InhzOnN0cmluZyI+Z29vZ2xlLW9hdXRoMjwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT48L3NhbWw6QXR0cmlidXRlPjxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJodHRwOi8vc2NoZW1hcy5hdXRoMC5jb20vaWRlbnRpdGllcy9kZWZhdWx0L2lzU29jaWFsIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OnVyaSI+PHNhbWw6QXR0cmlidXRlVmFsdWUgeHNpOnR5cGU9InhzOmJvb2xlYW4iPnRydWU8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iaHR0cDovL3NjaGVtYXMuYXV0aDAuY29tL2NsaWVudElEIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OnVyaSI+PHNhbWw6QXR0cmlidXRlVmFsdWUgeHNpOnR5cGU9InhzOnN0cmluZyI+OFBLdE5XbGliZGdENXZCUGJBVnRHSW5WUVRIWGJoR0I8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iaHR0cDovL3NjaGVtYXMuYXV0aDAuY29tL2NyZWF0ZWRfYXQiIE5hbWVGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphdHRybmFtZS1mb3JtYXQ6dXJpIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6YW55VHlwZSI+U2F0IEphbiAxNCAyMDIzIDE4OjU1OjE1IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSk8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iaHR0cDovL3NjaGVtYXMuYXV0aDAuY29tL2VtYWlsX3ZlcmlmaWVkIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OnVyaSI+PHNhbWw6QXR0cmlidXRlVmFsdWUgeHNpOnR5cGU9InhzOmJvb2xlYW4iPnRydWU8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iaHR0cDovL3NjaGVtYXMuYXV0aDAuY29tL2xvY2FsZSIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDp1cmkiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhzaTp0eXBlPSJ4czpzdHJpbmciPmVuPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDpBdHRyaWJ1dGU+PHNhbWw6QXR0cmlidXRlIE5hbWU9Imh0dHA6Ly9zY2hlbWFzLmF1dGgwLmNvbS9uaWNrbmFtZSIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDp1cmkiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhzaTp0eXBlPSJ4czpzdHJpbmciPnllbXEuamQ8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iaHR0cDovL3NjaGVtYXMuYXV0aDAuY29tL3BpY3R1cmUiIE5hbWVGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphdHRybmFtZS1mb3JtYXQ6dXJpIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6c3RyaW5nIj5odHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BRWRGVHA1YTJRNEJvYnVuRkdSVHYxSloxV3RFbVVmUnhlQTIzMjlsNlVWZT1zOTYtYzwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT48L3NhbWw6QXR0cmlidXRlPjxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJodHRwOi8vc2NoZW1hcy5hdXRoMC5jb20vdXBkYXRlZF9hdCIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDp1cmkiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhzaTp0eXBlPSJ4czphbnlUeXBlIj5TYXQgSmFuIDE0IDIwMjMgMTg6NTU6MTUgR01UKzAwMDAgKENvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lKTwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT48L3NhbWw6QXR0cmlidXRlPjwvc2FtbDpBdHRyaWJ1dGVTdGF0ZW1lbnQ+PC9zYW1sOkFzc2VydGlvbj48L3NhbWxwOlJlc3BvbnNlPg==';
