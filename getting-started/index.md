# Getting Started

The **Tokenizer API** is an Elysia REST service that deploys and manages ERC-20 and ERC-721 tokens through the Moonwell Factory. It runs on port **3001** by default.

The API, web frontend, and this documentation site live in **separate repositories** (`moonwell-api`, `moonwell-web`, `moonwell-docs`). Clone the repos you need side by side for local development.

## Prerequisites

- [Bun](https://bun.sh) installed
- PostgreSQL (local instance or hosted provider such as Neon)
- A local EVM chain (Anvil/Hardhat) or configured RPC endpoint

## Run the API locally

In the **moonwell-api** repository:

```bash
bun install
cp .env.example .env   # adjust DATABASE_URL, RPC_URL, FACTORY_ADDRESS, etc.
bun run db:migrate
bun run dev            # http://localhost:3001
```

## Run the web app locally

In the **moonwell-web** repository (with the API already running):

```bash
bun install
OPENAPI_SPEC_PATH=../moonwell-api/openapi.json bun run codegen:api
NEXT_PUBLIC_API_URL=http://localhost:3001 bun run dev   # http://localhost:3000
```

## Run the docs locally

In this **moonwell-docs** repository:

```bash
bun install
bun run docs:dev   # http://localhost:5173
```

### Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | HTTP listen port |
| `DATABASE_URL` | — | PostgreSQL connection string |
| `JWT_SECRET` | — | Secret for signing session tokens |
| `RPC_URL` | `http://127.0.0.1:8545` | EVM JSON-RPC endpoint |
| `CHAIN_ID` | `31337` | Chain ID for transaction proofs |
| `FACTORY_ADDRESS` | — | Moonwell Factory contract address |
| `SIGNER_PRIVATE_KEY` | — | Hot wallet for onchain transactions |
| `PUBLIC_API_URL` | `http://localhost:3001` | Base URL used in API links (local media URLs when `STORAGE_DRIVER=local`) |
| `STORAGE_DRIVER` | `local` | Media storage backend: `local` (disk) or `s3` (Railway Bucket) |
| `UPLOAD_DIR` | `./uploads` | Filesystem storage for media uploads (local driver only) |
| `S3_BUCKET` | — | Railway Bucket name (required when `STORAGE_DRIVER=s3`) |
| `S3_ENDPOINT` | `https://storage.railway.app` | S3-compatible endpoint |
| `S3_REGION` | `auto` | Bucket region |
| `S3_ACCESS_KEY_ID` | — | Bucket access key |
| `S3_SECRET_ACCESS_KEY` | — | Bucket secret key |
| `MEDIA_PUBLIC_BASE_URL` | — | Public CDN base for media URLs (required when `STORAGE_DRIVER=s3`) |

For production bucket setup, see [Railway media storage](/deployment/railway-media-storage).

## Base URL

All endpoints are relative to:

```
http://localhost:3001
```

In production, replace with your deployed API host.

## Explore interactively

When the API is running:

- **Swagger UI** — [http://localhost:3001/openapi](http://localhost:3001/openapi)
- **OpenAPI JSON** — [http://localhost:3001/openapi/json](http://localhost:3001/openapi/json)

The web app generates its typed HTTP client from `openapi.json` using `openapi-typescript`.

## Typical workflow

1. [Sign up](/getting-started/authentication#signup) or [sign in](/getting-started/authentication#signin)
2. Optionally [create an API key](/reference/api-keys) for programmatic access
3. [Deploy a token](/guides/deploy-token) (`POST /tokens`)
4. [Mint tokens](/guides/manage-token#mint) or [upload media](/guides/media)
5. Set [metadata](/guides/manage-token#metadata) and verify via the [token URI resolver](/guides/token-uri)

## Next steps

- [Authentication](/getting-started/authentication) — JWT tokens and API keys
- [Error handling](/getting-started/errors) — Error codes and HTTP status mapping
