# Stats

Mint quota usage for the current billing period.

## GET /stats

Return plan and mint quota for the authenticated user.

| | |
|---|---|
| **Auth** | Yes |

**Response 200:**

```json
{
  "plan": "BASIC",
  "mintsUsed": 0,
  "mintsRemaining": 100,
  "periodStart": "2026-06-01T00:00:00.000Z",
  "periodEnd": "2026-07-01T00:00:00.000Z"
}
```

| Field | Description |
|-------|-------------|
| `plan` | `BASIC`, `PRO`, or `PRO_PLUS` |
| `mintsUsed` | Mints consumed this period (deploy + mint) |
| `mintsRemaining` | Mints left before quota exceeded |
| `periodStart` | Current period start (ISO 8601) |
| `periodEnd` | Current period end (ISO 8601) |

```bash
curl https://api-rho-gold-msx2gnbkee.vercel.app/stats \
  -H "Authorization: Bearer <token>"
```

Deploying a token (`POST /tokens`) and minting (`POST /tokens/:address/mint`) each consume one mint.
