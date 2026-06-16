# Getting Started

The **Tokenizer API** is a hosted REST service that deploys and manages ERC-20 and ERC-721 tokens through the Moonwell Factory. Call it over HTTPS with a JWT or API key — you do not need to run the API on your machine.

## Base URL

All endpoints are relative to the production API host:

```
https://api-rho-gold-msx2gnbkee.vercel.app
```

## Quick start

Create an account and receive a JWT:

```bash
curl -X POST https://api-rho-gold-msx2gnbkee.vercel.app/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"password123"}'
```

Use the returned `token` as a Bearer header on protected routes:

```bash
curl https://api-rho-gold-msx2gnbkee.vercel.app/me \
  -H "Authorization: Bearer <token>"
```

See [Authentication](/getting-started/authentication) for sign-in, API keys, and plan details.

## Explore interactively

The live API exposes OpenAPI documentation you can browse or import into API clients:

- **Swagger UI** — `https://api-rho-gold-msx2gnbkee.vercel.app/openapi`
- **OpenAPI JSON** — `https://api-rho-gold-msx2gnbkee.vercel.app/openapi/json`

See [OpenAPI reference](/reference/openapi) for the full spec and security scheme.

## Typical workflow

1. [Sign up](/getting-started/authentication#signup) or [sign in](/getting-started/authentication#signin)
2. Optionally [create an API key](/reference/api-keys) for programmatic access
3. [Deploy a token](/guides/deploy-token) (`POST /tokens`)
4. [Mint tokens](/guides/manage-token#mint) and [set metadata](/guides/manage-token#metadata) (host images externally first)
5. Verify via the [token URI resolver](/guides/token-uri)

## Next steps

- [Authentication](/getting-started/authentication) — JWT tokens and API keys
- [Error handling](/getting-started/errors) — Error codes and HTTP status mapping
