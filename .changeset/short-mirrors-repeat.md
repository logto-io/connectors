---
"@logto/connector-saml": major
---

1. Change the `nameIDFormat` type from an array of strings to an enum type because SAML entity only takes the first valid value from the array.
2. Add `formItems` to `metadata` so that the AC (Admin Console) can display the SAML connector's configuration in a "Form View", making the setup process simpler for our users.
