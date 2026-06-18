# Tokens

Deploy, list, and manage ERC-20/ERC-721 tokens. All endpoints require authentication unless noted.

Replace `0xADDRESS` with your token contract address.

## GET /tokens

List tokens owned by the authenticated user.

| | |
|---|---|
| **Auth** | Yes |

**Response 200:**

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

## POST /tokens

Deploy a new token. Consumes one mint quota.

| | |
|---|---|
| **Auth** | Yes |
| **Content-Type** | `application/json` |

**ERC-20 body:**

```json
{
  "type": "ERC20",
  "name": "Moon Drop",
  "symbol": "MD",
  "decimals": 18,
  "isPermissionless": false
}
```

**ERC-721 body:**

```json
{
  "type": "ERC721",
  "name": "Moon Drop",
  "symbol": "MD",
  "isPermissionless": false
}
```

**Response 200:**

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

## GET /tokens/:address

Get onchain details for an owned token.

**Response 200:**

```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0",
  "type": "ERC20",
  "name": "Moon Drop",
  "symbol": "MD",
  "paused": false,
  "transferLocked": false,
  "permissionless": false,
  "owner": "0x...",
  "creator": "you@example.com"
}
```

## POST /tokens/:address/mint

Mint tokens. Consumes one mint quota.

**ERC-20 body:**

```json
{
  "owner": "0xRecipient",
  "amount": "1000000000000000000"
}
```

**ERC-721 body:**

```json
{
  "owner": "0xRecipient"
}
```

**Response 200:**

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

## POST /tokens/:address/pause

Pause all token operations (mint, burn, metadata, transfers). **Body:** none.

**Response 200:** `{"success": true}`

## POST /tokens/:address/unpause

Resume all operations. **Body:** none.

**Response 200:** `{"success": true}`

## POST /tokens/:address/lock-transfers

Block transfers and approvals. **Body:** none.

**Response 200:** `{"success": true}`

## POST /tokens/:address/unlock-transfers

Restore transfers and approvals. **Body:** none.

**Response 200:** `{"success": true}`

## POST /tokens/:address/freeze

Freeze an account.

**Body:** `{"account": "0x..."}`

**Response 200:** `{"success": true}`

## POST /tokens/:address/unfreeze

Unfreeze an account.

**Body:** `{"account": "0x..."}`

**Response 200:** `{"success": true}`

## POST /tokens/:address/approve-account

Approve an account for permissioned minting.

**Body:** `{"account": "0x..."}`

**Response 200:** `{"success": true}`

## POST /tokens/:address/unapprove-account

Revoke account approval.

**Body:** `{"account": "0x..."}`

**Response 200:** `{"success": true}`

## GET /tokens/:address/metadata/keys

List on-chain metadata key names for an owned token.

**Response 200:**

```json
{
  "keys": ["name", "description", "image", "edition", "rarity"]
}
```

## PUT /tokens/:address/metadata

Set structured metadata. The API maps fields to ERC-8048 on-chain keys automatically.

Image hosting is client-side — upload to IPFS or any host, then pass the URI in `image`.

**ERC-20 body:**

```json
{
  "name": "Moon Drop",
  "description": "A fungible token",
  "image": "https://cdn.example.com/logo.png",
  "attributes": {
    "tier": "gold"
  }
}
```

**ERC-721 body:**

```json
{
  "tokenId": "1",
  "name": "Moon Drop #1",
  "description": "First edition",
  "image": "ipfs://bafy...",
  "attributes": {
    "edition": 1,
    "rarity": "legendary"
  }
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Display name |
| `description` | Yes | Description text |
| `image` | No | Hosted image URI (IPFS or HTTP) |
| `attributes` | No | Custom traits, max 13 keys |
| `tokenId` | ERC-721 only | Target token ID |

**Response 200:** `{"success": true}`

## Token URI (public)

| Method | Path | Auth |
|--------|------|------|
| `GET` | `/tokenURI/:address/:tokenId?` | No |

See [Token URI guide](/guides/token-uri).
