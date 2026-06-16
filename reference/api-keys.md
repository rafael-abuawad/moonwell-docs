# API Keys

Create, list, and revoke programmatic access keys. All endpoints require authentication.

API keys are returned with the `mw_` prefix and work as Bearer tokens.

## POST /api-keys

Create a new API key.

| | |
|---|---|
| **Auth** | Yes |
| **Content-Type** | `application/json` |

**Request body:**

```json
{
  "name": "ci-key"
}
```

`name` is optional.

**Response 200:**

```json
{
  "id": "clx...",
  "name": "ci-key",
  "keyPrefix": "mw_abcd",
  "key": "mw_abcd1234...",
  "createdAt": "2026-06-10T12:00:00.000Z"
}
```

The full `key` is shown only at creation.

```bash
curl -X POST https://api-rho-gold-msx2gnbkee.vercel.app/api-keys \
  -H "Authorization: Bearer <jwt>" \
  -H "Content-Type: application/json" \
  -d '{"name":"ci-key"}'
```

## GET /api-keys

List all API keys for the authenticated user.

| | |
|---|---|
| **Auth** | Yes |

**Response 200:**

```json
[
  {
    "id": "clx...",
    "name": "ci-key",
    "keyPrefix": "mw_abcd",
    "revokedAt": null,
    "createdAt": "2026-06-10T12:00:00.000Z"
  }
]
```

```bash
curl https://api-rho-gold-msx2gnbkee.vercel.app/api-keys \
  -H "Authorization: Bearer <token>"
```

## DELETE /api-keys/:id

Revoke an API key.

| | |
|---|---|
| **Auth** | Yes |

**Response 200:** Revoked key object (same shape as list item with `revokedAt` set).

**Errors:**

| Status | Code | When |
|--------|------|------|
| 404 | `NOT_FOUND` | Key not found |
| 409 | `CONFLICT` | Key already revoked |

```bash
curl -X DELETE https://api-rho-gold-msx2gnbkee.vercel.app/api-keys/clx... \
  -H "Authorization: Bearer <token>"
```
