# Manage a Token

After deploying, use the token `address` to mint, pause, freeze accounts, and set onchain metadata.

All endpoints require authentication and token ownership.

Replace `0xADDRESS` with your deployed contract address.

## Get token details

```bash
curl http://localhost:3001/tokens/0xADDRESS \
  -H "Authorization: Bearer <token>"
```

```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0",
  "type": "ERC20",
  "name": "Moon Drop",
  "symbol": "MD",
  "paused": false,
  "permissionless": false,
  "owner": "0x...",
  "creator": "you@example.com"
}
```

## Mint {#mint}

Minting consumes one quota unit (same as deploy).

### ERC-20 mint

```bash
curl -X POST http://localhost:3001/tokens/0xADDRESS/mint \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "owner": "0xRecipientAddress",
    "amount": "1000000000000000000"
  }'
```

`amount` is a string representing wei (18 decimals for standard ERC-20).

### ERC-721 mint

```bash
curl -X POST http://localhost:3001/tokens/0xADDRESS/mint \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "owner": "0xRecipientAddress"
  }'
```

The next available token ID is minted automatically.

**Success response:**

```json
{
  "success": true,
  "data": {
    "transaction": {
      "hash": "0xabc...",
      "explorerUrl": "http://localhost/explorer/tx/0xabc..."
    }
  }
}
```

## Pause and unpause

```bash
# Pause all transfers
curl -X POST http://localhost:3001/tokens/0xADDRESS/pause \
  -H "Authorization: Bearer <token>"

# Resume transfers
curl -X POST http://localhost:3001/tokens/0xADDRESS/unpause \
  -H "Authorization: Bearer <token>"
```

## Account controls

Freeze, unfreeze, approve, and unapprove individual accounts:

```bash
curl -X POST http://localhost:3001/tokens/0xADDRESS/freeze \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"account": "0xAccountAddress"}'
```

| Endpoint | Action |
|----------|--------|
| `POST /:address/freeze` | Block account from transfers |
| `POST /:address/unfreeze` | Restore account |
| `POST /:address/approve-account` | Approve account for permissioned mint |
| `POST /:address/unapprove-account` | Revoke approval |

All require `{"account": "0x..."}` in the request body.

## Metadata {#metadata}

Tokens use ERC-8048-style keyed metadata. Set keys first, then values.

### Set metadata keys

```bash
curl -X PUT http://localhost:3001/tokens/0xADDRESS/metadata/keys \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"keys": ["name", "description", "image"]}'
```

Up to 16 keys per token.

### Set metadata values

**ERC-20** (contract-level metadata):

```bash
curl -X PUT http://localhost:3001/tokens/0xADDRESS/metadata \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "values": [
      "https://api.example.com/tokenURI/0xADDRESS",
      "A fungible token",
      "https://api.example.com/tokens/0xADDRESS/media/asset-id"
    ]
  }'
```

**ERC-721** (per-token-ID metadata):

```bash
curl -X PUT http://localhost:3001/tokens/0xADDRESS/metadata \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "tokenId": "1",
    "values": [
      "Moon Drop #1",
      "First edition",
      "https://api.example.com/tokens/0xADDRESS/media/asset-id"
    ]
  }'
```

Values are URI strings — typically links to hosted JSON or [uploaded media](/guides/media).

## Common errors

| Status | Code | Cause |
|--------|------|-------|
| 403 | `FORBIDDEN` | Token belongs to another user |
| 403 | `QUOTA_EXCEEDED` | No mints remaining |
| 404 | `NOT_FOUND` | Token address not in database |
| 422 | `VALIDATION_ERROR` | Invalid owner, amount, or token ID |
| 502 | `CHAIN_ERROR` | Onchain call failed |
