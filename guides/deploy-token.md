# Deploy a Token

Deploy a new ERC-20 or ERC-721 contract via the Moonwell Factory. Deployment consumes one mint from your quota.

## Prerequisites

- Valid Bearer token (JWT or API key)

## Deploy ERC-20

```bash
curl -X POST https://api-rho-gold-msx2gnbkee.vercel.app/tokens \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "ERC20",
    "name": "Moon Drop",
    "symbol": "MD",
    "decimals": 18,
    "isPermissionless": false
  }'
```

| Field | Type | Constraints |
|-------|------|-------------|
| `type` | `"ERC20"` | Required literal |
| `name` | string | Max 25 characters |
| `symbol` | string | Max 5 characters |
| `decimals` | number | 0–18 |
| `isPermissionless` | boolean | Whether anyone can mint |

## Deploy ERC-721

```bash
curl -X POST https://api-rho-gold-msx2gnbkee.vercel.app/tokens \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "ERC721",
    "name": "Moon Drop",
    "symbol": "MD",
    "isPermissionless": false
  }'
```

ERC-721 does not require a `decimals` field.

## Success response

```json
{
  "success": true,
  "data": {
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0",
    "type": "ERC20",
    "name": "Moon Drop",
    "symbol": "MD",
    "createdAt": "2026-06-10T12:00:00.000Z",
    "transaction": {
      "hash": "0xabc...",
      "explorerUrl": "https://explorer.example.com/tx/0xabc..."
    }
  }
}
```

Save the `address` — all subsequent token operations use it. Use the `explorerUrl` from the response to view the transaction on a block explorer.

## List your tokens

```bash
curl https://api-rho-gold-msx2gnbkee.vercel.app/tokens \
  -H "Authorization: Bearer <token>"
```

Returns an array (empty if none deployed yet):

```json
[
  {
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0",
    "type": "ERC20",
    "name": "Moon Drop",
    "symbol": "MD",
    "createdAt": "2026-06-10T12:00:00.000Z"
  }
]
```

## Quota

Each deploy reserves one mint from your plan quota. Check usage:

```bash
curl https://api-rho-gold-msx2gnbkee.vercel.app/stats \
  -H "Authorization: Bearer <token>"
```

## Common errors

| Status | Code | Cause |
|--------|------|-------|
| 403 | `QUOTA_EXCEEDED` | No mints remaining |
| 422 | `VALIDATION_ERROR` | Invalid name, symbol, or decimals |
| 422 | `BASE_URI_TOO_LONG` | ERC-721 base URI too long |
| 502 | `CHAIN_ERROR` | RPC or transaction failure |
| 503 | `DEPLOY_UNAVAILABLE` | Factory not configured |

## Next steps

- [Manage your token](/guides/manage-token) — mint, pause, metadata
- [Token URI](/guides/token-uri) — public metadata endpoint
