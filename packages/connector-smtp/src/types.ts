import { emailRegEx } from '@logto/shared';
import { z } from 'zod';

/**
 * @doc https://nodemailer.com/smtp/
 */

/**
 * UsageType here is used to specify the use case of the template, can be either
 * 'Register', 'SignIn', 'ForgotPassword', 'Continue' or 'Test'.
 */
const requiredTemplateUsageTypes = ['Register', 'SignIn', 'ForgotPassword', 'Continue']; // 'Continue' will be truncated after main flow API refactor.

export enum ContextType {
  Text = 'text/plain',
  Html = 'text/html',
}

const templateGuard = z.object({
  usageType: z.string(),
  contentType: z.nativeEnum(ContextType),
  subject: z.string(),
  content: z.string(), // With variable {{code}}, support HTML
});

/**
 * Auth Options
 * See https://nodemailer.com/smtp/#authentication and https://nodemailer.com/smtp/oauth2/.
 */
const loginAuthGuard = z.object({
  user: z.string(),
  pass: z.string(),
  type: z.enum(['login', 'Login', 'LOGIN']).optional(),
});

const oauth2AuthWithKeyGuard = z.object({
  type: z.enum(['oauth2', 'OAuth2', 'OAUTH2']).optional(),
  user: z.string(),
  privateKey: z.string().or(z.object({ key: z.string(), passphrase: z.string() })),
  serviceClient: z.string(),
});

const oauth2AuthWithTokenGuard = z.object({
  type: z.enum(['oauth2', 'OAuth2', 'OAUTH2']).optional(),
  user: z.string(),
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  refreshToken: z.string().optional(),
  accessToken: z.string().optional(),
  expires: z.number().optional(), // Optional Access Token expire time in ms.
  accessUrl: z.string().optional(),
});

const authGuard = loginAuthGuard.or(oauth2AuthWithKeyGuard).or(oauth2AuthWithTokenGuard);

/**
 * TLS Options
 */
const tlsGuard = z.object({
  secure: z.boolean().default(false),
  // See https://nodejs.org/api/tls.html#new-tlstlssocketsocket-options and https://nodemailer.com/smtp/#tls-options for more information.
  tls: z.union([z.object({}).catchall(z.unknown()), z.object({})]),
  servername: z.string().optional(),
  ignoreTLS: z.boolean().optional(),
  requireTLS: z.boolean().optional(),
});

/**
 * Connection Options
 * See https://nodemailer.com/smtp/#connection-options.
 */
const connectionGuard = z.object({
  name: z.string().optional(),
  localAddress: z.string(),
  connectionTimeout: z.number().default(2 * 60 * 1000), // In ms, default is 2 mins.
  greetingTimeout: z.number().default(30 * 1000), // In ms, default is 30 seconds.
  socketTimeout: z.number().default(10 * 60 * 1000), // In ms, default is 10 mins.
  dnsTimeout: z.number().default(30 * 1000), // In ms, default is 30 seconds.
});

/**
 * Debug Options
 * See https://nodemailer.com/smtp/#debug-options.
 */
const debuggingGuard = z.object({
  logger: z.boolean().optional(),
  debug: z.boolean().optional(),
});

/**
 * Security Options
 * See https://nodemailer.com/smtp/#security-options.
 */
const securityGuard = z.object({
  disableFileAccess: z.boolean().optional(),
  disableUrlAccess: z.boolean().optional(),
});

export const smtpBaseConfigGuard = z
  .object({
    host: z.string(),
    port: z.number(),
    auth: authGuard,
    fromEmail: z.string().regex(emailRegEx),
    replyTo: z.string().regex(emailRegEx).optional(),
    templates: z.array(templateGuard).refine(
      (templates) =>
        requiredTemplateUsageTypes.every((requiredType) =>
          templates.map((template) => template.usageType).includes(requiredType)
        ),
      (templates) => ({
        message: `Template with UsageType (${requiredTemplateUsageTypes
          .filter(
            (requiredType) =>
              !templates.map((template) => template.usageType).includes(requiredType)
          )
          .join(', ')}) should be provided!`,
      })
    ),
  })
  .merge(debuggingGuard)
  .merge(securityGuard);

export const smtpBaseConfigWithTlsGuard = smtpBaseConfigGuard.merge(tlsGuard);

export const smtpBaseConfigWithConnectionGuard = smtpBaseConfigGuard.merge(connectionGuard);

export const smtpBaseConfigWithTlsAndConnectionGuard = smtpBaseConfigGuard
  .merge(tlsGuard)
  .merge(connectionGuard);

export const smtpConfigGuard = z.union([
  smtpBaseConfigWithTlsAndConnectionGuard,
  smtpBaseConfigWithConnectionGuard,
  smtpBaseConfigWithTlsGuard,
  smtpBaseConfigGuard,
]);

export type SmtpConfig = z.infer<typeof smtpConfigGuard>;
