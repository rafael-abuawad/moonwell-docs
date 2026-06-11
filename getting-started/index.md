# Getting Started

The **Tokenizer API** is an Elysia REST service that deploys and manages ERC-20 and ERC-721 tokens through the Moonwell Factory. It runs on port **3001** by default.

## Prerequisites

- [Bun](https://bun.sh) installed
- A local EVM chain (Anvil/Hardhat) or configured RPC endpoint
- SQLite database (created automatically on first run)

## Run the API locally

From the monorepo root:

```bash
bun install
bun run dev
```

This starts the API at `http://localhost:3001`, the web app at `http://localhost:3000`, and the API documentation at `http://localhost:5173`.

To run only the API:

```bash
cd apps/api
cp .env.example .env   # adjust RPC_URL, FACTORY_ADDRESS, etc.
bun run dev
```

### Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | HTTP listen port |
| `DATABASE_URL` | `file:./dev.db` | SQLite connection string |
| `JWT_SECRET` | — | Secret for signing session tokens |
| `RPC_URL` | `http://127.0.0.1:8545` | EVM JSON-RPC endpoint |
| `CHAIN_ID` | `31337` | Chain ID for transaction proofs |
| `FACTORY_ADDRESS` | — | Moonwell Factory contract address |
| `SIGNER_PRIVATE_KEY` | — | Hot wallet for onchain transactions |
| `PUBLIC_API_URL` | `http://localhost:3001` | Base URL used in media asset links (local dev only) |
| `UPLOAD_DIR` | `./uploads` | Local filesystem storage for media (dev/test only) |
| `BLOB_READ_WRITE_TOKEN` | — | Vercel Blob token (auto-injected on Vercel; enables production media storage) |

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

## Typical workflow

1. [Sign up](/getting-started/authentication#signup) or [sign in](/getting-started/authentication#signin)
2. Optionally [create an API key](/reference/api-keys) for programmatic access
3. [Deploy a token](/guides/deploy-token) (`POST /tokens`)
4. [Mint tokens](/guides/manage-token#mint) or [upload media](/guides/media)
5. Set [metadata](/guides/manage-token#metadata) and verify via the [token URI resolver](/guides/token-uri)

## Next steps

- [Authentication](/getting-started/authentication) — JWT tokens and API keys
- [Error handling](/getting-started/errors) — Error codes and HTTP status mapping
