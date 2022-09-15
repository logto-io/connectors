import { z } from 'zod';

export const discordConfigGuard = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
});

export type DiscordConfig = z.infer<typeof discordConfigGuard>;

export const accessTokenResponseGuard = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
});

export type AccessTokenResponse = z.infer<typeof accessTokenResponseGuard>;

export const userInfoResponseGuard = z.object({
  id: z.string(),
  username: z.string().optional(),
  avatar: z.string().optional(),
  email: z.string().optional(),
  verified: z.boolean().optional(),
});

export type UserInfoResponse = z.infer<typeof userInfoResponseGuard>;

export const authorizationCallbackErrorGuard = z.object({
  error: z.string(),
  error_description: z.string(),
});

export const authResponseGuard = z.object({ code: z.string(), redirectUri: z.string() });
