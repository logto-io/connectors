---
"@logto/connector-smtp": patch
---

1. Remove the dependency on @logto/shared.
2. Do not check the email format since we have blocked invalid inputs on frontend; Also no need to check the format for a custom sign-in since it should be decided by the developer.
