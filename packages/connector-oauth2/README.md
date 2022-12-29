# OAuth standard connector

The official Logto connector for OAuth 2.0 protocol.

## Get started

The OAuth connector enables Logto's connection to an arbitrary social identity provider that supports OAuth 2.0 protocol.

In the following guide, let's take Google as an example to show how to set up a OAuth connector.

> ℹ️ **Note**
> 
> OAuth connector is a special kind of connector in Logto, you can add a few OAuth-based connectors.

## Register a Google App

For detailed steps on registering a Google App for Logto's social sign-in use, please refer to [Logto Google Connector configuration guide](https://github.com/logto-io/connectors/tree/master/packages/connector-google#set-up-a-project-in-the-google-api-console).

## Compose the connector JSON

You can choose which OAuth grant type to use by configuring `oauthGrantType` as either 'AuthorizationCode' or 'Implicit'. You may curious that there are other two grant types in OAuth protocol, why doesn't Logto also support them. The reason is that those two types (resource owner password credentials and client credentials) do not fit the use cases of Logto.

`scope` determines the resource you can access to after a successful authorization.

`clientId` and `clientSecret` can be found at your Google app details page.

You are expected to find `authorizationEndpoint`, `tokenEndpoint` and `userInfoEndpoint` in social vendor's documentation.

Logto also provide a `profileMap` field that users can customize the mapping from the social vendors' profiles which are usually not standard. The key is Logto's standard user profile field name and corresponding value should be social profiles field name. In current stage, Logto only concern 'id', 'name', 'avatar', 'email' and 'phone' from social profile, only 'id' is required and others are optional fields.

You can find [Google user profile response](https://developers.google.com/identity/openid-connect/openid-connect#an-id-tokens-payload) and hence its `profileMap` should be like:

```json
{
  "id": "sub",
  "avatar": "picture"
}
```

Here are some examples of OAuth connector config JSON connected to Google server. Other vendor's config could vary.

### Authorization Code grant type

`responseType` and `grantType` can only be fixed values with both authorization code and implicit grant type, so we make them optional and default values will be automatically filled.

`tokenEndpoint` is required since a token request is obligatory.

`tokenEndpointResponseType` is an optional field, and should be either 'query-string' or 'json' if provided. The default value is 'query-string'. This field only work when the grant type is 'Authorization Code'. It will determine how OAuth connector parse the token response and an error could break the social sign-in flow if wrong value is set.

```json
{
  "oauthGrantType": "AuthorizationCode",
  "clientId": "<your-client-id>",
  "clientSecret": "<your-client-secret>",
  "scope": "<OPTIONAL-'profile email'>",
  "authorizationEndpoint": "<vendor-authorization-endpoint>",
  "tokenEndpoint": "<vendor-token-endpoint>",
  "tokenEndpointResponseType": "<OPTIONAL-'json'-or-'query-string'>",
  "userInfoEndpoint": "<vendor-user-info-endpoint>",
  "profileMap": {
    "id": "<OPTIONAL-'id'>",
    "name": "<OPTIONAL-'name'>",
    "avatar": "<OPTIONAL-'avatar'>",
    "email": "<OPTIONAL-'email'>",
    "phone": "<OPTIONAL-'phone'>"
  }
}
```

### Implicit grant type

`tokenEndpoint` in this flow is not required for implicit grant type since we can get `access_token` from response of authorization request.

```json
{
  "oauthGrantType": "Implicit",
  "clientId": "<your-client-id>",
  "clientSecret": "<your-client-secret>",
  "scope": "<OPTIONAL-'profile email'>",
  "authorizationEndpoint": "<vendor-authorization-endpoint>",
  "userInfoEndpoint": "<vendor-user-info-endpoint>",
  "profileMap": {
    "id": "<OPTIONAL-'id'>",
    "name": "<OPTIONAL-'name'>",
    "avatar": "<OPTIONAL-'avatar'>",
    "email": "<OPTIONAL-'email'>",
    "phone": "<OPTIONAL-'phone'>"
  }
}
```

## Config types

| Name                      | Type       | Required |
|---------------------------|------------|----------|
| oauthGrantType            | enum       | true     |
| authorizationEndpoint     | string     | true     |
| userInfoEndpoint          | string     | true     |
| clientId                  | string     | true     |
| clientSecret              | string     | true     |
| tokenEndpointResponseType | enum       | false    |
| responseType              | string     | false    |
| grantType                 | string     | false    |
| tokenEndpoint             | string     | false    |
| scope                     | string     | false    |
| profileMap                | ProfileMap | false    |

| ProfileMap fields | Type   | Required | Default value |
|-------------------|--------|----------|---------------|
| id                | string | false    | id            |
| name              | string | false    | name          |
| avatar            | string | false    | avatar        |
| email             | string | false    | email         |
| phone             | string | false    | phone         |

## Reference

* [The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749)
* [Google Identity: Setting up OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/openid-connect#appsetup)
