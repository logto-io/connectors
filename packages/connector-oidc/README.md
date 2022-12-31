# OIDC standard connector

The official Logto connector for OIDC protocol.

## Get started

The OAuth connector enables Logto's connection to an arbitrary social identity provider that supports OAuth 2.0 protocol.

In the following guide, let's take Google as an example to show how to set up a OIDC connector.

> ℹ️ **Note**
> 
> OIDC connector is a special kind of connector in Logto, you can add a few OIDC-based connector.

## Register a Google App

For detailed steps on registering a Google App for Logto's social sign-in use, please refer to [Logto Google Connector configuration guide](https://github.com/logto-io/connectors/tree/master/packages/connector-google#set-up-a-project-in-the-google-api-console).

## Compose the connector JSON

You can choose which OIDC authorization flow to use by configuring `oidcFlowType` as either 'AuthorizationCode', 'Implicit' or 'Hybrid'.

`scope` determines the resource you can access to after a successful authorization.

`clientId` and `clientSecret` can be found at your Google app details page.

Some more advanced parameters is also supported, [check more details](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest).

You are expected to find `authorizationEndpoint`, `tokenEndpoint`, `jwksUri` and `issuer` as OpenID Provider's configuration information. They should be available in social vendor's documentation.

Since an authentication request is required for all different flow types, an `authenticationRequestOptionalConfig` is provided to wrap all optional configs, you can find details on [OIDC Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest). You may also find that `nonce` is missing in this config. Since `nonce` should identical for each request, we put the generation of `nonce` in code implementation. So do not worry about it!

Here are some examples of OIDC connector config JSON connected to Google. Other vendor's config could vary.

### Authorization Code Flow

`responseType` can only be 'code' with authorization code flow, so we make it optional and a default value will be automatically filled.

`tokenEndpoint` is required since a token request is obligatory.

```json
{
  "oidcFlowType": "AuthorizationCode",
  "scope": "profile email",
  "responseType": "<OPTIONAL-'code'>",
  "clientId": "<your-client-id>",
  "clientSecret": "<your-client-secret>",
  "authorizationEndpoint": "<vendor-authorization-endpoint>",
  "tokenEndpoint": "<vendor-token-endpoint>",
  "idTokenVerificationConfig": {
    "jwksUri": "<vendor's-jwks-uri>",
    "issuer": "<vendor's-token-issuer>",
  },
  "authenticationRequestOptionalConfig": {
    "responseMode": "<OPTIONAL-response-mode>",
    "display": "<OPTIONAL-display>",
    "prompt": "<OPTIONAL-prompt>",
    "maxAge": "<OPTIONAL-max-age>",
    "uiLocales": "<OPTIONAL-ui-locales>",
    "idTokenHint": "<OPTIONAL-id-token-hint>",
    "loginHint": "<OPTIONAL-login-hint>",
    "acrValues": "<OPTIONAL-acr-values>",
  },,
  "customConfig": {
    "customParameter1": "<custom-parameter-1>",
    "customParameter2": "<custom-parameter-2>"
  }
}
```

### Implicit Flow

`responseType` of implicit flow should either be 'id_token token' or 'id_token'.

`tokenEndpoint` in this flow is not required.

```json
{
  "oidcFlowType": "Implicit",
  "scope": "profile email",
  "responseType": "<OPTIONAL-'id_token token'>",
  "clientId": "<your-client-id>",
  "clientSecret": "<your-client-secret>",
  "authorizationEndpoint": "<vendor-authorization-endpoint>",
  "idTokenVerificationConfig": {
    "jwksUri": "<vendor's-jwks-uri>",
    "issuer": "<vendor's-token-issuer>",
  },
  "authenticationRequestOptionalConfig": {
    "responseMode": "<OPTIONAL-response-mode>",
    "display": "<OPTIONAL-display>",
    "prompt": "<OPTIONAL-prompt>",
    "maxAge": "<OPTIONAL-max-age>",
    "uiLocales": "<OPTIONAL-ui-locales>",
    "idTokenHint": "<OPTIONAL-id-token-hint>",
    "loginHint": "<OPTIONAL-login-hint>",
    "acrValues": "<OPTIONAL-acr-values>",
  },,
  "customConfig": {
    "customParameter1": "<custom-parameter-1>",
    "customParameter2": "<custom-parameter-2>"
  }
}
```

### Hybrid Flow

`responseType` in hybrid flow can be one of 'id_token code', 'id_token code token', 'code token'.

If 'id_token' is not presented in `responseType`, then `tokenEndpoint` is required for fetching `idToken` via token request.

```json
{
  "oidcFlowType": "Implicit",
  "scope": "profile email",
  "responseType": "<OPTIONAL-'code id_token token'>",
  "clientId": "<your-client-id>",
  "clientSecret": "<your-client-secret>",
  "authorizationEndpoint": "<vendor-authorization-endpoint>",
  "tokenEndpoint": "<OPTIONAL-vendor-token-endpoint>",
  "idTokenVerificationConfig": {
    "jwksUri": "<vendor's-jwks-uri>",
    "issuer": "<vendor's-token-issuer>",
  },
  "authenticationRequestOptionalConfig": {
    "responseMode": "<OPTIONAL-response-mode>",
    "display": "<OPTIONAL-display>",
    "prompt": "<OPTIONAL-prompt>",
    "maxAge": "<OPTIONAL-max-age>",
    "uiLocales": "<OPTIONAL-ui-locales>",
    "idTokenHint": "<OPTIONAL-id-token-hint>",
    "loginHint": "<OPTIONAL-login-hint>",
    "acrValues": "<OPTIONAL-acr-values>",
  },,
  "customConfig": {
    "customParameter1": "<OPTIONAL-custom-parameter-1>",
    "customParameter2": "<OPTIONAL-custom-parameter-2>"
  }
}
```

> ℹ️ **Note**
> 
> For all flow types, we provided an OPTIONAL `customConfig` key to put your customize parameters.
> Each social identity provider could have their own variant on OIDC standard protocol. If your desired social identity provider strictly stick to OIDC standard protocol, the you do not need to care about `customConfig`.

## Config types

| Name                                | Type                                | Required  |
|-------------------------------------|-------------------------------------|-----------|
| oidcFlowType                        | enum                                | True      |
| scope                               | string                              | True      |
| clientId                            | string                              | True      |
| clientSecret                        | string                              | True      |
| authorizationEndpoint               | string                              | True      |
| idTokenVerificationConfig           | IdTokenVerificationConfig           | True      |
| authenticationRequestOptionalConfig | AuthenticationRequestOptionalConfig | False     |
| customConfig                        | Record<string, string>              | False     |


| AuthenticationRequestOptionalConfig properties | Type   | Required |
|------------------------------------------------|--------|----------|
| responseType                                   | string | False    |
| tokenEndpoint                                  | string | False    |
| responseMode                                   | string | False    |
| display                                        | string | False    |
| prompt                                         | string | False    |
| maxAge                                         | string | False    |
| uiLocales                                      | string | False    |
| idTokenHint                                    | string | False    |
| loginHint                                      | string | False    |
| acrValues                                      | string | False    |


| IdTokenVerificationConfig properties | Type                              | Required |
|--------------------------------------|-----------------------------------|----------|
| jwksUri                              | string                            | True     |
| issuer                               | string \| string[]                | False    |
| audience                             | string \| string[]                | False    |
| algorithms                           | string[]                          | False    |
| clockTolerance                       | string \| number                  | False    |
| crit                                 | Record<string, string \| boolean> | False    |
| currentDate                          | Date                              | False    |
| maxTokenAge                          | string \| number                  | False    |
| subject                              | string                            | False    |
| typ                                  | string                            | False    |

See [here](https://github.com/panva/jose/blob/main/docs/interfaces/jwt_verify.JWTVerifyOptions.md) to find more details about `IdTokenVerificationConfig`.
