# Errors

All API errors return a consistent JSON shape:

```json
{
  "code": "ERROR_CODE",
  "message": "Human-readable description"
}
```

## Error codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Missing or invalid Bearer token |
| `FORBIDDEN` | 403 | Authenticated but not allowed (e.g. token not owned) |
| `NOT_FOUND` | 404 | Resource does not exist |
| `CONFLICT` | 409 | Duplicate resource or already revoked |
| `VALIDATION_ERROR` | 422 | Invalid request body or parameters |
| `BASE_URI_TOO_LONG` | 422 | ERC-721 base URI exceeds maximum length |
| `QUOTA_EXCEEDED` | 403 | Mint quota exhausted for current period |
| `CHAIN_ERROR` | 502 | Onchain transaction or RPC failure |
| `DEPLOY_UNAVAILABLE` | 503 | Factory or deploy service unavailable |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

## HTTP status mapping

The API uses standard HTTP semantics:

- **401** — Authentication required or credentials invalid
- **403** — Authenticated but action denied (quota, ownership)
- **404** — Endpoint resource not found
- **409** — State conflict (duplicate email, revoked key)
- **422** — Request validation failed
- **500** — Server-side failure
- **502** — Blockchain/RPC error
- **503** — Dependency unavailable

## Examples

### Invalid credentials

```bash
curl -X POST https://api-rho-gold-msx2gnbkee.vercel.app/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"wrong"}'
```

```json
{
  "code": "UNAUTHORIZED",
  "message": "Invalid credentials"
}
```

### Missing authentication

```bash
curl https://api-rho-gold-msx2gnbkee.vercel.app/me
```

```json
{
  "code": "UNAUTHORIZED",
  "message": "Unauthorized"
}
```

### Validation error

```bash
curl -X PUT https://api-rho-gold-msx2gnbkee.vercel.app/tokens/0xADDRESS/metadata \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"description": "Missing name field"}'
```

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Validation failed"
}
```

### Quota exceeded

When mint quota is exhausted:

```json
{
  "code": "QUOTA_EXCEEDED",
  "message": "Mint quota exceeded"
}
```

Check remaining quota with [`GET /stats`](/reference/stats).

## Success responses

Token deploy and mint endpoints wrap data in a success envelope:

```json
{
  "success": true,
  "data": { ... }
}
```

Simple action endpoints (pause, metadata) return:

```json
{
  "success": true
}
```
