---
"@logto/connector-mock-standard-email": minor
"@logto/connector-sendgrid-email": minor
"@logto/connector-tencent-sms": minor
"@logto/connector-aliyun-sms": minor
"@logto/connector-mock-email": minor
"@logto/connector-twilio-sms": minor
"@logto/connector-aliyun-dm": minor
"@logto/connector-mock-sms": minor
"@logto/connector-aws-ses": minor
"@logto/connector-smtp": minor
---

- Add "Generic" verification code type, remove deprecated "Continue" code type. Generic type verification code is used when user needs to send and verify verification code through our management APIs. Correspondingly, a "Generic" type mail or SMS template should be configured in the connector config.
- Replace the term "passcode" with "verification code".
