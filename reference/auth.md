# Auth

Signup and signin endpoints. No authentication required.

## POST /auth/signup

Create a new user account.

| | |
|---|---|
| **Auth** | No |
| **Content-Type** | `application/json` |

**Request body:**

```json
{
  "email": "you@example.com",
  "password": "password123"
}
```

**Response 200:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "clx...",
    "email": "you@example.com",
    "plan": "BASIC"
  }
}
```

**Errors:** `409 CONFLICT` — email already registered

```bash
curl -X POST https://api-rho-gold-msx2gnbkee.vercel.app/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"password123"}'
```

## POST /auth/signin

Authenticate with existing credentials.

| | |
|---|---|
| **Auth** | No |
| **Content-Type** | `application/json` |

**Request body:** Same as signup.

**Response 200:** Same shape as signup.

**Errors:** `401 UNAUTHORIZED` — invalid credentials

```bash
curl -X POST https://api-rho-gold-msx2gnbkee.vercel.app/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"password123"}'
```
