# Manage a Token

After deploying, use the token `address` to mint, pause, freeze accounts, and set onchain metadata.

All endpoints require authentication and token ownership.

Replace `0xADDRESS` with your deployed contract address.

## Get token details

```bash
curl https://api-rho-gold-msx2gnbkee.vercel.app/tokens/0xADDRESS \
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
curl -X POST https://api-rho-gold-msx2gnbkee.vercel.app/tokens/0xADDRESS/mint \
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
curl -X POST https://api-rho-gold-msx2gnbkee.vercel.app/tokens/0xADDRESS/mint \
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
      "explorerUrl": "https://explorer.example.com/tx/0xabc..."
    }
  }
}
```

## Pause and unpause

```bash
# Pause all transfers
curl -X POST https://api-rho-gold-msx2gnbkee.vercel.app/tokens/0xADDRESS/pause \
  -H "Authorization: Bearer <token>"

# Resume transfers
curl -X POST https://api-rho-gold-msx2gnbkee.vercel.app/tokens/0xADDRESS/unpause \
  -H "Authorization: Bearer <token>"
```

## Account controls

Freeze, unfreeze, approve, and unapprove individual accounts:

```bash
curl -X POST https://api-rho-gold-msx2gnbkee.vercel.app/tokens/0xADDRESS/freeze \
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

Tokens use ERC-8048 on-chain keyed metadata. Send a structured JSON body and the API maps fields to on-chain keys automatically.

### Image hosting

The API does not store or serve images. Upload assets to IPFS (recommended) or any HTTP-accessible host from your frontend, then pass the URI in the `image` field.

### Set metadata

**ERC-20** (contract-level metadata):

```bash
curl -X PUT https://api-rho-gold-msx2gnbkee.vercel.app/tokens/0xADDRESS/metadata \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Moon Drop",
    "description": "A fungible token",
    "image": "https://cdn.example.com/logo.png",
    "attributes": {
      "tier": "gold"
    }
  }'
```

**ERC-721** (per-token-ID metadata):

```bash
curl -X PUT https://api-rho-gold-msx2gnbkee.vercel.app/tokens/0xADDRESS/metadata \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "tokenId": "1",
    "name": "Moon Drop #1",
    "description": "First edition",
    "image": "ipfs://bafy...",
    "attributes": {
      "edition": 1,
      "rarity": "legendary"
    }
  }'
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Token or NFT display name |
| `description` | Yes | Human-readable description |
| `image` | No | URI to hosted image (IPFS or HTTP). Required for [token URI](/guides/token-uri) resolution |
| `attributes` | No | Custom traits (max 13 keys). Values: string, number, or boolean |
| `tokenId` | ERC-721 only | Target NFT token ID |

On-chain key order: `name`, `description`, optional `image`, then attribute keys (alphabetically sorted). Maximum 16 keys total.

**Success response:** `{"success": true}`

### List metadata keys

Read current on-chain key names (optional, for debugging):

```bash
curl https://api-rho-gold-msx2gnbkee.vercel.app/tokens/0xADDRESS/metadata/keys \
  -H "Authorization: Bearer <token>"
```

```json
{
  "keys": ["name", "description", "image", "edition", "rarity"]
}
```

## Common errors

| Status | Code | Cause |
|--------|------|-------|
| 403 | `FORBIDDEN` | Token belongs to another user |
| 403 | `QUOTA_EXCEEDED` | No mints remaining |
| 404 | `NOT_FOUND` | Token address not in database |
| 422 | `VALIDATION_ERROR` | Invalid owner, amount, token ID, or metadata (e.g. too many attribute keys) |
| 502 | `CHAIN_ERROR` | Onchain call failed |
