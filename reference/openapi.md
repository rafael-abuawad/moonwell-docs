# OpenAPI

The Tokenizer API exposes a machine-readable OpenAPI 3 spec generated from Elysia route definitions.

## Live documentation

The hosted API serves interactive Swagger UI and the raw OpenAPI JSON:

| Resource | URL |
|----------|-----|
| Swagger UI | [https://api-rho-gold-msx2gnbkee.vercel.app/openapi](https://api-rho-gold-msx2gnbkee.vercel.app/openapi) |
| OpenAPI JSON | [https://api-rho-gold-msx2gnbkee.vercel.app/openapi/json](https://api-rho-gold-msx2gnbkee.vercel.app/openapi/json) |

The spec includes request/response schemas from TypeBox models on each route.

## Security scheme

All protected routes use Bearer authentication:

```yaml
bearerAuth:
  type: http
  scheme: bearer
  bearerFormat: JWT or API key (mw_...)
```

## Tags

| Tag | Endpoints |
|-----|-----------|
| Auth | `/auth/signup`, `/auth/signin` |
| API Keys | `/api-keys` |
| Profile | `/me` |
| Stats | `/stats` |
| Tokens | `/tokens/*` (structured metadata via `PUT /tokens/:address/metadata`) |
| Token URI | `/tokenURI/:address/:tokenId?` |

## Relationship to these docs

This documentation site provides developer-friendly guides and examples. The OpenAPI spec is the schema authority for request/response types.

When in doubt, compare examples here against the live spec at `/openapi/json`.
