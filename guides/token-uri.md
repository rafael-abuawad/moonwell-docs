# Token URI Resolver

The token URI endpoint returns ERC-721-compatible JSON metadata built from onchain ERC-8048 entries. It is **public** — no authentication required.

## Endpoint

```
GET /tokenURI/:address/:tokenId?
```

| Parameter | Required | Description |
|-----------|----------|-------------|
| `address` | Yes | Token contract address |
| `tokenId` | ERC-721 only | NFT token ID. Omit for ERC-20 (uses onchain token ID). |

## ERC-721 example

```bash
curl https://api-rho-gold-msx2gnbkee.vercel.app/tokenURI/0xADDRESS/1
```

**Success response (200):**

```json
{
  "name": "Moon Drop #1",
  "description": "First edition",
  "image": "https://media.example.com/media/user-id/0xADDRESS/550e8400-....webp",
  "attributes": {
    "rarity": "legendary",
    "edition": 1
  }
}
```

## ERC-20 example

For fungible tokens, omit `tokenId` — the API reads the onchain token ID automatically:

```bash
curl https://api-rho-gold-msx2gnbkee.vercel.app/tokenURI/0xADDRESS
```

## How it works

1. Looks up the token in the database by address
2. Reads all metadata key/value pairs from the contract
3. Maps known keys (`name`, `description`, `image`) to top-level fields
4. Remaining keys become `attributes`

Set metadata via the [manage token guide](/guides/manage-token#metadata) before expecting a response.

## Common errors

| Status | Code | Cause |
|--------|------|-------|
| 404 | `NOT_FOUND` | Unknown address, missing tokenId for ERC-721, or no metadata set |
| 502 | `CHAIN_ERROR` | RPC failure reading onchain data |

## Integration with wallets

Point your contract's `tokenURI` or metadata values at this endpoint:

```
https://api-rho-gold-msx2gnbkee.vercel.app/tokenURI/0xADDRESS/1
```
