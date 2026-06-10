# OpenAPI

The Tokenizer API exposes a machine-readable OpenAPI 3 spec generated from Elysia route definitions.

## Live documentation

With the API running locally:

| Resource | URL |
|----------|-----|
| Swagger UI | [http://localhost:3001/openapi](http://localhost:3001/openapi) |
| OpenAPI JSON | [http://localhost:3001/openapi/json](http://localhost:3001/openapi/json) |

The spec includes request/response schemas from TypeBox models on each route.

## Export the spec

Save a snapshot to disk (requires a running server):

```bash
cd apps/api
bun run openapi:export
```

This writes `openapi.json` in the `apps/api` directory.

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
| Tokens | `/tokens/*` |
| Media | `/tokens/:address/media` |
| Token URI | `/tokenURI/:address/:tokenId?` |

## Relationship to these docs

This documentation site provides developer-friendly guides and examples. The OpenAPI spec is the schema authority for request/response types.

When in doubt, compare examples here against the live spec at `/openapi/json`.
