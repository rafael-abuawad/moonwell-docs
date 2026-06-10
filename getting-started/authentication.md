# Authentication

Protected endpoints require a Bearer token in the `Authorization` header. The API accepts two credential types:

1. **JWT** — Returned by `/auth/signup` and `/auth/signin`. Use for interactive sessions.
2. **API key** — Prefixed with `mw_`. Use for server-to-server integrations.

```bash
Authorization: Bearer <token-or-api-key>
```

## Signup {#signup}

Create a new account and receive a JWT.

**`POST /auth/signup`** — No auth required.

```bash
curl -X POST http://localhost:3001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"password123"}'
```

**Request body:**

```json
{
  "email": "you@example.com",
  "password": "password123"
}
```

| Field | Type | Constraints |
|-------|------|-------------|
| `email` | string | Valid email format |
| `password` | string | Minimum 8 characters |

**Success response (200):**

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

**Common errors:**

| Status | Code | When |
|--------|------|------|
| 409 | `CONFLICT` | Email already registered |

## Signin {#signin}

Authenticate with existing credentials.

**`POST /auth/signin`** — No auth required.

```bash
curl -X POST http://localhost:3001/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"password123"}'
```

**Success response (200):** Same shape as signup.

**Common errors:**

| Status | Code | When |
|--------|------|------|
| 401 | `UNAUTHORIZED` | Invalid email or password |

## API keys

API keys are long-lived credentials ideal for CI, scripts, and backend services.

```bash
# Create a key (requires JWT)
curl -X POST http://localhost:3001/api-keys \
  -H "Authorization: Bearer <jwt>" \
  -H "Content-Type: application/json" \
  -d '{"name":"my-integration"}'

# Use the key like a JWT
curl http://localhost:3001/me \
  -H "Authorization: Bearer mw_..."
```

The raw key is returned **only once** at creation. Store it securely.

See [API Keys reference](/reference/api-keys) for list and revoke endpoints.

## Plans

New users start on the **BASIC** plan. Plans affect mint quotas — see [Stats](/reference/stats).

| Plan | Description |
|------|-------------|
| `BASIC` | Default tier (100 mints per period) |
| `PRO` | Higher quota |
| `PRO_PLUS` | Highest quota |

## Unauthenticated requests

Requests to protected routes without a valid Bearer token receive:

```json
{
  "code": "UNAUTHORIZED",
  "message": "..."
}
```

HTTP status: **401**.
