# AWS direct mail connector

The official Logto connector for AWS connector for direct mail service.

Amazon SES邮件推送服务 Logto 官方连接器[中文文档](#aws-ses邮件连接器)

- [AWS direct mail connector](#aws-direct-mail-connector)
  - [Get started](#get-started)
  - [Configure a mail service in the AWS service console](#configure-a-mail-service-in-the-aws-service-console)
    - [Register AWS account](#register-aws-account)
    - [Create a identity](#create-a-identity)
    - [Edit the JSON of the connector](#edit-the-json-of-the-connector)
    - [Test the Amazon SES connector](#test-the-amazon-ses-connector)
    - [Configure types](#configure-types)
- [AWS SES 邮件连接器](#aws-ses-邮件连接器)
  - [开始上手](#开始上手)
  - [在 AWS 服务控制台中配置一个邮件服务](#在-aws-服务控制台中配置一个邮件服务)
    - [注册 AWS 帐号](#注册-aws-帐号)
    - [创建发信身份](#创建发信身份)
  - [编写连接器的 JSON](#编写连接器的-json)
    - [测试 Amazon SES 邮件连接器](#测试-amazon-ses-邮件连接器)
    - [配置类型](#配置类型)

## Get started
Amazon SES is a cloud email service provider that can integrate into any application for bulk email sending.

Logto team to call the Amazon Simple Email Service APIs, with the help of which Logto end-users can register and sign in to their Logto account via mail verification code (or in other words, passcode).


## Configure a mail service in the AWS service console

> 💡 **Tip**
> 
> You can skip some sections if you have already finished.

### Register AWS account

Go to [AWS](https://aws.amazon.com/) and register an account.

### Create a identity

- Go to `Amazon Simple Email Service` Console
- Create an identity, choose one of the following options
  - Create an domain
  - Create an email address


### Edit the JSON of the connector

1. Click your username in the upper right corner of the Amazon console to enter `Security Credentials`. If you don't have one, create an `AccessKey` and save it carefully.
2. Complete the settings of the `Amazon Simple Email Service` connector:
   - Use the `AccessKey ID` and `AccessKey Secret` obtained in step 1 to fill in `accessKeyId` and `accessKeySecret` respectively.
   - `region`: Fill in the `region` field with the region of the identity you use to send mail.
   - `emailAddress`: The email address you use to send mail, in the format of `Logto<noreply@logto.io>` or `<noreply@logto.io>`

the following parameters are optional; parameters description can be found in the [AWS SES API documentation](https://docs.aws.amazon.com/ses/latest/APIReference-V2/API_SendEmail.html).

- `feedbackForwardingEmailAddress`
- `feedbackForwardingEmailAddressIdentityArn`
- `configurationSetName`

Here is an example of the JSON of the `Amazon SES` connector:

```json
{
  "accessKeyId": "<access-key-id>",
  "accessKeySecret": "<access-key-secret>",
  "region": "<region>",
  "emailAddress": "<noreply@logto.io>",
  "templates": [
    {
      "usageType": "SignIn",
      "subject": "<sign-in-template-subject>",
      "content": "<sign-in-template-content>"
    },
    {
      "usageType": "Register",
      "subject": "<register-template-subject>",
      "content": "<register-template-content>"
    },
    {
      "usageType": "ForgotPassword",
      "subject": "<forgot-password-template-subject>",
      "content": "<forgot-password-template-content>"
    },
    {
      "usageType": "Continue",
      "subject": "<continue-template-subject>",
      "content": "<continue-template-content>"
    },
    {
      "usageType": "Test",
      "subject": "<test-template-subject>",
      "content": "<test-template-content>"
    }
  ]
}

```

### Test the Amazon SES connector

You can type in an email address and click on "Send" to see whether the settings work before "Save and Done".

That's it. Don't forget to [Enable connector in sign-in experience](https://docs.logto.io/docs/tutorials/get-started/enable-passcode-sign-in/#enable-connector-in-sign-in-experience).

### Configure types

| Name                                      | Type              |
| ----------------------------------------- | ----------------- |
| accessKeyId                               | string            |
| accessKeySecret                           | string            |
| region                                    | string            |
| emailAddress                              | string (OPTIONAL) |
| emailAddressIdentityArn                   | string (OPTIONAL) |
| feedbackForwardingEmailAddress            | string (OPTIONAL) |
| feedbackForwardingEmailAddressIdentityArn | string (OPTIONAL) |
| configurationSetName                      | string (OPTIONAL) |
| templates                                 | Template[]        |

| Template Properties | Type        | Enum values                                                        |
| ------------------- | ----------- | ------------------------------------------------------------------ |
| subject             | string      | N/A                                                                |
| content             | string      | N/A                                                                |
| usageType           | enum string | 'Register' \| 'SignIn' \| 'ForgotPassword' \| 'Continue' \| 'Test' |


# AWS SES 邮件连接器

## 开始上手

Amazon SES 是云电子邮件发送服务，它可以集成到任何应用程序中，用于批量发送电子邮件。

本连接器是 Logto 官方提供的 Amazon SES 邮件连接器，帮助终端用户通过邮件验证码进行登录注册。

## 在 AWS 服务控制台中配置一个邮件服务

> 💡 **Tip**
> 
> 你可以跳过已经完成的部分。

### 注册 AWS 帐号

前往 [AWS](https://aws.amazon.com/) 并完成帐号的注册。

### 创建发信身份

- 进入 `Amazon Simple Email Service` Console
- 创建发信身份，根据需要，以下任选一种
  - 创建域
  - 电子邮件地址

## 编写连接器的 JSON

1. 在 Amazon 控制台右上角点击你的用户名，进入`安全凭证`，如果你没有，请创建 `AccessKey`，并妥善保存
2. 完成 `Amazon Simple Email Service` 连接器的设置：
    - 使用在步骤 1 中拿到的一对「AccessKey ID」和「AccessKey Secret」来分别填入 `accessKeyId` 和 `accessKeySecret`
    - `region`：使用发信身份所在的 region 填入`region` 字段
    - `emailAddress`：发信人邮箱地址，格式：`Logto<noreply@logto.io>`，也可以仅使用 `<noreply@logto.io>`

以下参数通常不需要配置，除非你明确知道你需要做什么；参数的含义可以参考 [AWS SES DOC](https://docs.aws.amazon.com/ses/latest/APIReference-V2/API_SendEmail.html)。
- `feedbackForwardingEmailAddress`
- `feedbackForwardingEmailAddressIdentityArn`
- `configurationSetName`

这是一个 Amazon SES 邮件服务连接器 JSON 配置的样例。

```json
{
  "accessKeyId": "<access-key-id>",
  "accessKeySecret": "<access-key-secret>",
  "region": "<region>",
  "emailAddress": "<noreply@logto.io>",
  "templates": [
    {
      "usageType": "SignIn",
      "subject": "<sign-in-template-subject>",
      "content": "<sign-in-template-content>"
    },
    {
      "usageType": "Register",
      "subject": "<register-template-subject>",
      "content": "<register-template-content>"
    },
    {
      "usageType": "ForgotPassword",
      "subject": "<forgot-password-template-subject>",
      "content": "<forgot-password-template-content>"
    },
    {
      "usageType": "Continue",
      "subject": "<continue-template-subject>",
      "content": "<continue-template-content>"
    },
    {
      "usageType": "Test",
      "subject": "<test-template-subject>",
      "content": "<test-template-content>"
    }
  ]
}

```

### 测试 Amazon SES 邮件连接器

你可以在「保存并完成」之前输入一个邮件地址并点按「发送」来测试配置是否可以正常工作。

大功告成！快去 [启用短信或邮件验证码登录](https://docs.logto.io/zh-cn/docs/tutorials/get-started/enable-passcode-sign-in/#%E5%9C%A8%E7%99%BB%E5%BD%95%E4%BD%93%E9%AA%8C%E4%B8%AD%E5%90%AF%E7%94%A8%E8%BF%9E%E6%8E%A5%E5%99%A8) 吧。

### 配置类型

| 名称                                      | 类型              |
| ----------------------------------------- | ----------------- |
| accessKeyId                               | string            |
| accessKeySecret                           | string            |
| region                                    | string            |
| emailAddress                              | string (OPTIONAL) |
| emailAddressIdentityArn                   | string (OPTIONAL) |
| feedbackForwardingEmailAddress            | string (OPTIONAL) |
| feedbackForwardingEmailAddressIdentityArn | string (OPTIONAL) |
| configurationSetName                      | string (OPTIONAL) |
| templates                                 | Template[]        |

| 模板属性  | 类型        | 枚举值                                                             |
| --------- | ----------- | ------------------------------------------------------------------ |
| subject   | string      | N/A                                                                |
| content   | string      | N/A                                                                |
| usageType | enum string | 'Register' \| 'SignIn' \| 'ForgotPassword' \| 'Continue' \| 'Test' |
