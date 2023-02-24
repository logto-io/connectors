---
"@logto/connector-saml": major
---

Add `formItems` to `metadata` so that the AC (Admin Console) can display the SAML connector's configuration in a "Form View", making the setup process simpler for our users.

**BREAKING CHANGES**

 - We updated the SAML connectors `nameIDFormat` type from an array of strings to an enum type because the SAML entity only accepts the first valid value from the array. If you have already configured `nameIDFormat` in your SAML connector, please double-check that it still functions properly. We have also introduced a new "Form View" to streamline the process of creating and updating connectors, which should make it easier to configure connectors.
