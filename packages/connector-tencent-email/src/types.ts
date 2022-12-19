import { z } from 'zod';

export const fromInfo = z.object({
  fromAddress: z.string().optional(),
  fromName: z.string().optional(),
  replyAddress: z.string().optional(),
});

export const ValueNames = [
  'code',
  'toAddress',
  'fromAddress',
  'fromName',
  'replyAddress',
  'subject',
] as const;

export const mailTemplateParameters = z.object({
  name: z.string(),
  value: z.enum(ValueNames),
});

export const mailTemplate = z
  .object({
    subject: z.string(),
    usageType: z.string(),
    templateId: z.string(),
    params: z.array(mailTemplateParameters),
  })
  .merge(fromInfo);

export type MailTemplateType = z.infer<typeof mailTemplate>;

export const sendTencentMailConfigGuard = z
  .object({
    accessKeyId: z.string(),
    accessKeySecret: z.string(),
    region: z.string(),
    templates: z.array(mailTemplate),
  })
  .merge(fromInfo);

export type SendTencentMailConfig = z.infer<typeof sendTencentMailConfigGuard>;

export const tencentErrorResponse = z.object({
  Response: z.object({
    Error: z.object({
      Code: z.string(),
      Message: z.string(),
    }),
  }),
});

export declare type TencentErrorResponse = z.infer<typeof tencentErrorResponse>;

export const tencentSuccessResponse = z.object({
  Response: z.object({
    MessageId: z.string(),
    RequestId: z.string(),
  }),
});

export declare type TencentSuccessResponse = z.infer<typeof tencentSuccessResponse>;
