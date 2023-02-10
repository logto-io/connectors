---
"@logto/connector-saml": major
---

Change `nameIDFormat` from string array to enum, since only some specific values are meaningful. Use enum type instead of string array since only the first element in the array is concerned.
