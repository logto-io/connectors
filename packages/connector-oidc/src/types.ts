import { z } from 'zod';

const scopeOpenid = 'openid' as const;
export const delimiter = /[ +]/;

const allImplicitFlowResponseTypes = ['id_token', 'token'];
const requiredImplicitFlowResponseTypes = new Set(['id_token']);

const allHybridFlowResponseTypes = ['id_token', 'code', 'token'];
const requiredHybridFlowResponseTypes = new Set(['code']);

// Space-delimited 'scope' MUST contain 'openid', see https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth
export const scopePostProcessor = (scope: string) => {
  const splitScopes = scope.split(delimiter).filter(Boolean);

  if (!splitScopes.includes(scopeOpenid)) {
    return [...splitScopes, scopeOpenid].join(' ');
  }

  return scope;
};

export const implicitFlowResponsePostProcessor = (responseType: string) => {
  const splitResponseTypes = responseType.split(delimiter).filter(Boolean);

  if (splitResponseTypes.length === 0) {
    return allImplicitFlowResponseTypes.join(' ');
  }

  if (
    !splitResponseTypes.some((singleResponseType) =>
      requiredImplicitFlowResponseTypes.has(singleResponseType)
    )
  ) {
    throw new TypeError(
      `Required responseType ${JSON.stringify(
        Array.from(requiredImplicitFlowResponseTypes)
      )} is not presented!`
    );
  }

  if (
    !splitResponseTypes.every((singleResponseType) =>
      allImplicitFlowResponseTypes.includes(singleResponseType)
    )
  ) {
    throw new TypeError(
      `Some responseType ${JSON.stringify(
        splitResponseTypes.filter(
          (singleResponseType) => !allImplicitFlowResponseTypes.includes(singleResponseType)
        )
      )} is invalid.`
    );
  }

  return splitResponseTypes.join(' ');
};

export const hybridFlowResponsePostProcessor = (responseType: string) => {
  const splitResponseTypes = responseType.split(delimiter).filter(Boolean);

  if (splitResponseTypes.length === 0) {
    return allHybridFlowResponseTypes.join(' ');
  }

  if (
    !splitResponseTypes.some((singleResponseType) =>
      requiredHybridFlowResponseTypes.has(singleResponseType)
    )
  ) {
    throw new TypeError(
      `Required responseType ${JSON.stringify(
        splitResponseTypes.filter(
          (singleResponseType) => !allHybridFlowResponseTypes.includes(singleResponseType)
        )
      )} is not presented!`
    );
  }

  if (
    !splitResponseTypes.every((singleResponseType) =>
      allHybridFlowResponseTypes.includes(singleResponseType)
    )
  ) {
    throw new TypeError(
      `Some responseType ${JSON.stringify(
        splitResponseTypes.filter(
          (singleResponseType) => !allHybridFlowResponseTypes.includes(singleResponseType)
        )
      )} is invalid.`
    );
  }

  if (splitResponseTypes.length === 1) {
    throw new TypeError("At least one of 'token' and 'id_token' is needed.");
  }

  // For hybrid flow, 'code' is always required in response type, at least one another response type among 'token' and 'id_token' is required.
  return splitResponseTypes.join(' ');
};

export enum OidcFlowType {
  AuthorizationCode = 'AuthorizationCode',
  Implicit = 'Implicit',
  Hybrid = 'Hybrid',
}

export const oidcFlowTypeGuard = z.nativeEnum(OidcFlowType);

// See https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims.
// We only concern a subset of them, and social identity provider usually does not provide a complete set of them.
export const idTokenProfileStandardClaimsGuard = z.object({
  sub: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  email_verified: z.boolean().nullish(),
  phone: z.string().nullish(),
  phone_verified: z.boolean().nullish(),
  picture: z.string().nullish(),
  profile: z.string().nullish(),
  nonce: z.string().nullish(),
});

export const userProfileGuard = z.object({
  id: z.preprocess(String, z.string()),
  email: z.string().optional(),
  phone: z.string().optional(),
  name: z.string().optional(),
  avatar: z.string().optional(),
});

export type UserProfile = z.infer<typeof userProfileGuard>;

export const endpointConfigGuard = z.object({
  authorizationEndpoint: z.string(),
  tokenEndpoint: z.string(),
});

const clientConfigGuard = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
});

export const authorizationCodeFlowOptionalConfigGuard = z.object({
  responseMode: z.string().optional(),
  nonce: z.string().optional(),
  display: z.string().optional(),
  prompt: z.string().optional(),
  maxAge: z.string().optional(),
  uiLocales: z.string().optional(),
  idTokenHint: z.string().optional(),
  loginHint: z.string().optional(),
  acrValues: z.string().optional(),
});

// See https://github.com/panva/jose/blob/main/docs/interfaces/jwt_verify.JWTVerifyOptions.md for details.
export const idTokenVerificationConfigGuard = z.object({ jwksUri: z.string() }).merge(
  z
    .object({
      issuer: z.string().or(z.string().array()),
      audience: z.string().or(z.string().array()),
      algorithms: z.string().array(),
      clockTolerance: z.string().or(z.number()),
      crit: z.record(z.string(), z.boolean()),
      currentDate: z.date().default(new Date()),
      maxTokenAge: z.string().or(z.number()),
      subject: z.string(),
      typ: z.string(),
    })
    .partial()
);

export type IdTokenVerificationConfig = z.infer<typeof idTokenVerificationConfigGuard>;

export const authorizationCodeConfigGuard = z
  .object({
    oidcFlowType: z.literal(OidcFlowType.AuthorizationCode),
    responseType: z.literal('code').optional().default('code'),
    grantType: z.literal('authorization_code').optional().default('authorization_code'),
    scope: z.string().transform(scopePostProcessor),
    idTokenVerificationConfig: idTokenVerificationConfigGuard,
  })
  .merge(endpointConfigGuard)
  .merge(clientConfigGuard)
  .merge(authorizationCodeFlowOptionalConfigGuard)
  .catchall(z.string());

export type AuthorizationCodeConfig = z.infer<typeof authorizationCodeConfigGuard>;

export const implicitConfigGuard = z
  .object({
    oidcFlowType: z.literal(OidcFlowType.Implicit),
    responseType: z
      .string()
      .optional()
      .default('id_token')
      .transform(implicitFlowResponsePostProcessor),
    scope: z.string().transform(scopePostProcessor),
    idTokenVerificationConfig: idTokenVerificationConfigGuard,
  })
  .merge(endpointConfigGuard.omit({ tokenEndpoint: true }))
  .merge(clientConfigGuard)
  .merge(authorizationCodeFlowOptionalConfigGuard)
  .catchall(z.string());

export const hybridConfigGuard = z
  .object({
    oidcFlowType: z.literal(OidcFlowType.Hybrid),
    responseType: z
      .string()
      .optional()
      .default('code id_token token')
      .transform(hybridFlowResponsePostProcessor),
    grantType: z.literal('authorization_code').optional().default('authorization_code'),
    scope: z.string().transform(scopePostProcessor),
    idTokenVerificationConfig: idTokenVerificationConfigGuard,
  })
  .merge(endpointConfigGuard.omit({ tokenEndpoint: true }))
  .merge(endpointConfigGuard.pick({ tokenEndpoint: true }).partial())
  .merge(clientConfigGuard)
  .merge(authorizationCodeFlowOptionalConfigGuard)
  .catchall(z.string());

export type HybridConfig = z.infer<typeof hybridConfigGuard>;

export const oidcConfigGuard = z.discriminatedUnion('oidcFlowType', [
  authorizationCodeConfigGuard,
  implicitConfigGuard,
  hybridConfigGuard,
]);

export type OidcConfig = z.infer<typeof oidcConfigGuard>;

export const authResponseGuard = z
  .object({
    code: z.string(),
    state: z.string().optional(),
  })
  .catchall(z.string());

export type AuthResponse = z.infer<typeof authResponseGuard>;

export const implicitAuthResponseGuard = z
  .object({
    id_token: z.string(),
    access_token: z.string().optional(),
    token_type: z.string().optional(),
    expires_in: z.string().optional(),
    scope: z.string().optional(),
    state: z.string().optional(),
  })
  .catchall(z.string());

export const hybridAuthResponseGuard = z
  .object({
    code: z.string(),
    id_token: z.string().optional(),
    access_token: z.string().optional(),
    token_type: z.string().optional(),
  })
  .catchall(z.string());

export const accessTokenResponseGuard = z.object({
  id_token: z.string(),
  access_token: z.string().optional(),
  token_type: z.string().optional(),
  expires_in: z.number().optional(),
  refresh_token: z.string().optional(),
  scope: z.string().optional(),
  code: z.string().optional(),
});

export type AccessTokenResponse = z.infer<typeof accessTokenResponseGuard>;
