# Profile

Read and update the authenticated user's profile.

## GET /me

Return the current user's profile.

| | |
|---|---|
| **Auth** | Yes |

**Response 200:**

```json
{
  "id": "clx...",
  "email": "you@example.com",
  "plan": "BASIC",
  "walletAddress": null
}
```

```bash
curl https://api-rho-gold-msx2gnbkee.vercel.app/me \
  -H "Authorization: Bearer <token>"
```

## PATCH /me

Update profile fields.

| | |
|---|---|
| **Auth** | Yes |
| **Content-Type** | `application/json` |

**Request body:**

```json
{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0"
}
```

Pass `null` to clear the wallet address.

**Response 200:** Updated profile (same shape as GET).

**Errors:** `422 VALIDATION_ERROR` — invalid wallet address

```bash
curl -X PATCH https://api-rho-gold-msx2gnbkee.vercel.app/me \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"walletAddress":"0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0"}'
```
