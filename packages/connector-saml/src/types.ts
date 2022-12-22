import type * as saml from 'samlify';
import { z } from 'zod';

import {
  assertionBinding,
  authnRequestBinding,
  signingAlgorithms,
  defaultTimeout,
  messageSigningOrders,
} from './constant.js';

export const profileMapGuard = z
  .object({
    id: z.string().optional().default('id'),
    email: z.string().optional().default('email'),
    phone: z.string().optional().default('phone'),
    name: z.string().optional().default('name'),
    avatar: z.string().optional().default('avatar'),
  })
  .optional()
  .default({
    id: 'id',
    email: 'email',
    phone: 'phone',
    name: 'name',
    avatar: 'avatar',
  });

export type ProfileMap = z.infer<typeof profileMapGuard>;

export const samlConfigGuard = z
  .object({
    entityID: z.string(),
    signInEndpoint: z.string(),
    x509Certificate: z.string(),
    idpMetadataXml: z.string(),
    assertionConsumerServiceUrl: z.string(),
    signAuthnRequest: z.boolean().optional().default(false),
    requestSignatureAlgorithm: z.enum(signingAlgorithms).optional().default('RSA_SHA256'),
    messageSigningOrder: z.enum(messageSigningOrders).optional().default('sign-then-encrypt'),
    encryptAssertion: z.boolean().optional().default(false),
    privateKey: z.string().optional(),
    privateKeyPass: z.string().optional(),
    encPrivateKey: z.string().optional(),
    encPrivateKeyPass: z.string().optional(),
    nameIDFormat: z.string().array().optional(),
    timeout: z.number().optional().default(defaultTimeout), // In milliseconds.
    authnRequestBinding: z.enum(authnRequestBinding).optional().default('HTTP-Redirect'),
    assertionBinding: z.enum(assertionBinding).optional().default('HTTP-POST'),
    profileMap: profileMapGuard,
  })
  .refine(
    ({ signAuthnRequest, privateKey }) => !signAuthnRequest || privateKey,
    'Can not find `privateKey` but trying to sign authentication request!'
  )
  .refine(
    ({ encryptAssertion, encPrivateKey }) => !encryptAssertion || encPrivateKey,
    'Can not find `encPrivateKey` but have encrypted SAML assertion!'
  );

export type SamlConfig = z.infer<typeof samlConfigGuard>;

export type ESamlHttpRequest = Parameters<saml.ServiceProviderInstance['parseLoginResponse']>[2];

// Manually write this zod schema to ensure input parameter type
export const samlHttpRequestGuard = z
  .object({
    query: z.unknown(),
    body: z.unknown(),
    octetString: z.string(),
  })
  .partial();
