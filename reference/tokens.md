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
      "explorerUrl": "http://localhost/explorer/tx/0xabc..."
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
      "explorerUrl": "http://localhost/explorer/tx/0xabc..."
    }
  }
}
```

## POST /tokens/:address/pause

Pause all transfers. **Body:** none.

**Response 200:** `{"success": true}`

## POST /tokens/:address/unpause

Resume transfers. **Body:** none.

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

## PUT /tokens/:address/metadata/keys

Set metadata key names (up to 16).

**Body:**

```json
{
  "keys": ["name", "description", "image"]
}
```

**Response 200:** `{"success": true}`

## PUT /tokens/:address/metadata

Set metadata values (URIs).

**ERC-20 body:**

```json
{
  "values": ["uri1", "uri2", "uri3"]
}
```

**ERC-721 body:**

```json
{
  "tokenId": "1",
  "values": ["uri1", "uri2", "uri3"]
}
```

**Response 200:** `{"success": true}`

## Media endpoints

See [Media guide](/guides/media) for upload and serve details.

| Method | Path | Auth |
|--------|------|------|
| `POST` | `/tokens/:address/media` | Yes |
| `GET` | `/tokens/:address/media` | No |
| `GET` | `/tokens/:address/media/:id` | No |

## Token URI (public)

| Method | Path | Auth |
|--------|------|------|
| `GET` | `/tokenURI/:address/:tokenId?` | No |

See [Token URI guide](/guides/token-uri).
