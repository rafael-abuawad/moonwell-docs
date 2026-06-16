# Getting Started

The **Tokenizer API** is a hosted REST service that deploys and manages ERC-20 and ERC-721 tokens through the Moonwell Factory. Call it over HTTPS with a JWT or API key — you do not need to run the API on your machine.

## Base URL

All endpoints are relative to the production API host:

```
https://api.example.com
```

Replace `https://api.example.com` with your environment's base URL in the examples below and throughout these docs.

## Quick start

Create an account and receive a JWT:

```bash
curl -X POST https://api.example.com/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"password123"}'
```

Use the returned `token` as a Bearer header on protected routes:

```bash
curl https://api.example.com/me \
  -H "Authorization: Bearer <token>"
```

See [Authentication](/getting-started/authentication) for sign-in, API keys, and plan details.

## Explore interactively

The live API exposes OpenAPI documentation you can browse or import into API clients:

- **Swagger UI** — `https://api.example.com/openapi`
- **OpenAPI JSON** — `https://api.example.com/openapi/json`

See [OpenAPI reference](/reference/openapi) for the full spec and security scheme.

## Typical workflow

1. [Sign up](/getting-started/authentication#signup) or [sign in](/getting-started/authentication#signin)
2. Optionally [create an API key](/reference/api-keys) for programmatic access
3. [Deploy a token](/guides/deploy-token) (`POST /tokens`)
4. [Mint tokens](/guides/manage-token#mint) or [upload media](/guides/media)
5. Set [metadata](/guides/manage-token#metadata) and verify via the [token URI resolver](/guides/token-uri)

## Next steps

- [Authentication](/getting-started/authentication) — JWT tokens and API keys
- [Error handling](/getting-started/errors) — Error codes and HTTP status mapping
