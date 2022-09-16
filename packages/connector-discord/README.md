# Discord OAuth2 Connector

The Discord connector provides a way for your application to use Discord as an authorization system.

**Table of contents**
- [Register a developer application](#register-a-developer-application)
- [Configure Logto](#configure-logto)
  - [Config types](#config-types)
    - [clientId](#clientid)
    - [clientSecret](#clientseceret)

## Register a developer application
- Visit [Discord Developer Portal](https://discord.com/developers/applications) and sign in with your Discord account.
- Click the **New Application** button to create an application, choose a name for it (Ex: LogtoAuth), tick the box and click **Create**.
- Go to **OAuth2** page and click **Reset Secret**
- Take note of the **CLIENT ID** and **CLIENT SECRET** fields
- Add the valid redirects (Ex: **`http://auth.mycompany.io/callback/discord-universal`**)


## Configure Logto

### Config types

| Name         | Type    |
|--------------|---------|
| clientId     | string  |
| clientSecret | string  |

#### clientId
`clientId` is the `CLIENT ID` field we saved earlier.
(You can find it in the Oauth2 Page in Discord Developer Portal.)

#### clientSecret
`clientSecret` is the `CLIENT SECRET` we saved earlier.
(If you've lost it you need to click **Reset Secret**)