---
"@logto/connector-smtp": patch
---

1. Remove the dependency on @logto/shared.
2. Do not check the email format since we have blocked invalid inputs at FE.
