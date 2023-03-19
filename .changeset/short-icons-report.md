---
"@logto/connector-mock-standard-email": patch
"@logto/connector-sendgrid-email": patch
"@logto/connector-tencent-sms": patch
"@logto/connector-aliyun-sms": patch
"@logto/connector-mock-email": patch
"@logto/connector-twilio-sms": patch
"@logto/connector-aliyun-dm": patch
"@logto/connector-mock-sms": patch
"@logto/connector-aws-ses": patch
"@logto/connector-smtp": patch
---

Update README, default value and type guard of passwordless connectors' template field since we will use Generic template for all other cases rather than Sign-in, Register and ForgotPassword.
