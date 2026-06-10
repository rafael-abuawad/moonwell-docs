# For LLMs

This section helps AI agents integrate with the Tokenizer API efficiently.

## Base URL

```
http://localhost:3001
```

## Authentication

All protected endpoints require:

```
Authorization: Bearer <token>
```

Obtain a token via `POST /auth/signup` or `POST /auth/signin`. For long-lived access, create an API key via `POST /api-keys` (prefix `mw_`).

## Recommended call order

1. `POST /auth/signup` — create account, save JWT
2. `POST /api-keys` — optional, create programmatic key
3. `GET /stats` — check mint quota
4. `POST /tokens` — deploy ERC-20 or ERC-721
5. `POST /tokens/:address/mint` — mint to recipient
6. `POST /tokens/:address/media` — upload images
7. `PUT /tokens/:address/metadata/keys` — set metadata keys
8. `PUT /tokens/:address/metadata` — set metadata values
9. `GET /tokenURI/:address/:tokenId?` — verify public JSON

## Error format

```json
{
  "code": "ERROR_CODE",
  "message": "Human-readable description"
}
```

Common codes: `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `QUOTA_EXCEEDED`, `VALIDATION_ERROR`, `CHAIN_ERROR`.

## Machine-readable resources

| Resource | URL |
|----------|-----|
| LLM index | `/llms.txt` |
| Full API context | `/llms-full.txt` |
| OpenAPI JSON | `http://localhost:3001/openapi/json` |
| Condensed reference | [context.md](/llms/context) |

Copy [Full Context](/llms/context) or fetch `/llms-full.txt` into your system prompt for complete endpoint coverage.

## Content-Type notes

- JSON endpoints: `Content-Type: application/json`
- Media upload: `multipart/form-data` with field `file`
