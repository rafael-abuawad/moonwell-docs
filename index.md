---
layout: home
hero:
    name: Tokenizer API
    text: Deploy & manage tokens
    tagline: Control-plane API for ERC-20 and ERC-721 tokens via the Moonwell Factory.
    actions:
        - theme: brand
          text: Get Started
          link: /getting-started/
        - theme: alt
          text: API Reference
          link: /reference/auth
        - theme: alt
          text: OpenAPI
          link: http://localhost:3001/openapi
features:
    - title: Deploy tokens
      details: Create ERC-20 or ERC-721 contracts with a single authenticated POST request.
    - title: Manage onchain
      details: Mint, pause, freeze accounts, and set ERC-8048 metadata keys and values.
    - title: Media & metadata
      details: Upload optimized WebP images and serve public tokenURI JSON for wallets.
---

## Quick start

Start the API locally (default port **3001**), then authenticate:

```bash
# Sign up
curl -X POST http://localhost:3001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"password123"}'
```

Use the returned `token` as a Bearer header on protected routes:

```bash
curl http://localhost:3001/me \
  -H "Authorization: Bearer <token>"
```

See [Getting Started](/getting-started/) for full setup instructions.
