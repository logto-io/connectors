# Tencent push mail service connector

The official Logto connector for Tencent push email service.

腾讯云邮件推送服务 Logto 官方连接器 [中文文档](#腾讯云邮件连接器)

**Table of contents**

- [Tencent push mail service connector](#tencent-push-mail-service-connector)
- [腾讯云邮件推送服务连接器](#腾讯云邮件推送服务连接器)
  - [在腾讯云邮件推送服务控制台中配置邮件服务](#在腾讯云邮件推送服务控制台中配置邮件服务)
    - [创建腾讯云账号](#创建腾讯云账号)
    - [配置腾讯云邮件推送服务](#配置腾讯云邮件推送服务)
    - [编写连接器的 JSON 配置](#编写连接器的-json-配置)
    - [测试腾讯云邮件连接器](#测试腾讯云邮件连接器)
    - [配置类型](#配置类型)
  - [参考](#参考)

# 腾讯云邮件推送服务连接器

腾讯云是亚洲地区一个重要的云服务厂商，提供了包括邮件推送服务在内的诸多云服务。

本连接器是 Logto 官方提供的腾讯云邮件连接器，帮助终端用户通过邮件验证码进行登录注册。

## 在腾讯云邮件推送服务控制台中配置邮件服务

> 💡 **Tip**
>
> 你可以跳过已经完成的部分。

### 创建腾讯云账号

前往 [腾讯云](https://cloud.tencent.com/) 并完成账号注册并进行实名认证。

### 配置腾讯云邮件推送服务

1. 使用刚刚注册的账号登录并前往 [邮件推送服务控制台](https://console.cloud.tencent.com/ses)。按照官方「快速入门」的步骤，逐步完成配置。
2. 配置发信域名：腾讯云邮件推送支持所有行业标准的身份验证机制，包括域名密钥识别邮件 (DKIM)、发件人策略框架 (SPF)、基于域的邮件身份验证、报告和一致性 (DMARC)、邮件交换记录（MX record）。[官方文档](https://cloud.tencent.com/document/product/1288/60652)
    - 首先需要另行购买域名，如：example.com
    - 在发信域名配置页中，点击「新建」，输入你的发信域名，点击「提交」。
    - 之后返回至发信域名页面，在列表中选择你刚刚添加的域名，点击「验证」按钮。
    - 此时在弹出的发信域名配置弹窗中，按照文档提示在域名托管商的 DNS 设置中，添加如下解析记录（以 cloudflare 为例）：
    <img width="1082" alt="image" src="https://user-images.githubusercontent.com/12833674/210088125-1c2c36e9-7f0b-4573-83ca-fb28cb52c356.png">
    
    - DNS 设置完成后，点击「提交验证」按钮，如上述 DNS 设置成功则会看到「验证通过」状态。
3. 配置发信地址：在发信地址配置页中，点击「新建」按钮，选择你在上一步绑定的域名，并指定发信地址的前缀，如：`noreply@example.com`。
4. 创建发信模板：在发信模板配置页中，点击「新建」，输入模板名称，选择模板类型，并在邮件正文中使用 `{{变量名}}`作为模板的可替换内容。模板提交后需要通过审核之后才可使用。注：通常我们需要创建多个邮件模板，以满足我们在注册、登录、忘记密码等多个场合的不同需求。
5. 发送测试邮件：点击官方「快速入门」的最后一步，来到 [邮件发送](https://console.cloud.tencent.com/ses/send) 页面。选择发信模板，输入主题和收件人等信息，点击「发送」按钮。如能成功收到测试邮件，那么恭喜，你已成功完成腾讯云邮件的设置。

### 编写连接器的 JSON 配置

1. 前往腾讯云 [API 密钥管理](https://console.cloud.tencent.com/cam/capi) 页面，如尚未生成过密钥，可以点击「新建密钥」按钮，完成身份认证之后系统会自动生成一对 `SecretId` 和 `SecretKey`，请注意妥善保管密钥避免泄漏而造成不必要的损失。
2. 在 Logto Admin Console 的连接器页面，点击邮件连接器右侧的「配置」按钮，再在弹出的菜单中选择「腾讯云邮件服务」，点击「下一步」，进入配置页面。
3. 在右侧的编辑器中，将配置模版中的字段值替换为真实字段。以下为最小可用的模板示例：

```json
{
  "region": "ap-hongkong",
  "accessKeyId": "<your-secret-id>",
  "accessKeySecret": "<your-secret-key>",
  "fromAddress": "<replace-with-your-email-sender-address>",
  "templates": [
    {
      "params": [
        {
          "name": "code",
          "value": "code"
        }
      ],
      "subject": "Sign-in with Logto",
      "usageType": "SignIn",
      "templateId": "<replace-with-your-template-id>"
    },
    {
      "params": [
        {
          "name": "code",
          "value": "code"
        }
      ],
      "subject": "Sign-up with Logto",
      "usageType": "Register",
      "templateId": "<replace-with-your-template-id>"
    },
    {
      "params": [
        {
          "name": "code",
          "value": "code"
        }
      ],
      "subject": "Reset your password in Logto",
      "usageType": "ForgotPassword",
      "templateId": "<replace-with-your-template-id>"
    },
    {
      "params": [
        {
          "name": "code",
          "value": "code"
        }
      ],
      "subject": "Continue with Logto",
      "usageType": "Continue",
      "templateId": "<replace-with-your-template-id>"
    },
    {
      "params": [
        {
          "name": "code",
          "value": "code"
        }
      ],
      "subject": "Test with Logto",
      "usageType": "Test",
      "templateId": "<replace-with-your-template-id>"
    }
  ]
}
```

### 测试腾讯云邮件连接器

你可以在「保存并完成」之前输入一个邮件地址并点按「发送」来测试配置是否可以正常工作。

大功告成！快去「登录体验」页面 [启用邮件验证码登录](https://docs.logto.io/zh-cn/docs/tutorials/get-started/enable-passcode-sign-in/#%E5%9C%A8%E7%99%BB%E5%BD%95%E4%BD%93%E9%AA%8C%E4%B8%AD%E5%90%AF%E7%94%A8%E8%BF%9E%E6%8E%A5%E5%99%A8)
吧。

### 配置类型

| 名称             | 类型        | 必填      |
|-----------------|------------|-----------|
| accessKeyId     | string     |  Yes      |  
| accessKeySecret | string     |  Yes      |
| region          | string     |  Yes      |
| fromAddress     | string     |  Yes      |
| fromName        | string     |  No       |
| replyAddress    | string     |  No       |
| templates       | Template[] |  Yes      |

| 模板属性       | 类型        | 枚举值        | 必填      |
|--------------|-------------|--------------|----------|
| templateId   | string      | N/A          |  Yes     |
| usageType    | enum string | 'Register' \ 'SignIn' \ 'ForgotPassword' \ 'Continue' \ 'Test' |  Yes     | 
| subject      | string      | N/A          |  Yes     |
| params       | object      | N/A          |  Yes     |

## 参考

- [腾讯云文档中心 邮件推送](https://cloud.tencent.com/document/product/1288)
