---
"@logto/connector-oauth": major
"@logto/connector-oidc": major
---

**BREAKING CHANGES**

 - We're committed to ensuring the security of our customers' information and have recently made some changes to our OIDC and OAuth connectors. As a part of this, we have deprecated all other authentication flows and grant types for these connectors and now only support the authorization code flow/grant type. We kindly request that you update any OIDC or OAuth connectors that were configured with other flows and switch to the authorization code flow to ensure the highest level of security for your applications.
