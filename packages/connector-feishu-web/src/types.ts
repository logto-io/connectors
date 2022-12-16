import { z } from 'zod';

export const feishuConfigGuard = z.object({
  appId: z.string(),
  appSecret: z.string(),
});

export type FeishuConfig = z.infer<typeof feishuConfigGuard>;

export const feishuAuthCodeGuard = z.object({
  code: z.string(),
  redirectUri: z.string(),
});

export const feishuErrorResponse = z.object({
  error: z.string(),
  error_description: z.string(),
});

export const feishuAccessTokenResponse = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
  refresh_expires_in: z.number(),
});

export const feishuUserInfoResponse = z.object({
  sub: z.string(),
  name: z.string(),
  picture: z.string(),
  open_id: z.string(),
  union_id: z.string(),
  en_name: z.string(),
  tenant_key: z.string(),
  avatar_url: z.string(),
  avatar_thumb: z.string(),
  avatar_middle: z.string(),
  avatar_big: z.string(),
  email: z.string().optional().nullable(),
  user_id: z.string().optional().nullable(),
  employee_no: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
});
