# Tokenizer API — Full Context

Base URL: `https://api-rho-gold-msx2gnbkee.vercel.app`

Auth header: `Authorization: Bearer <jwt-or-mw_api_key>`

Error shape: `{"code":"ERROR_CODE","message":"..."}`

## Auth (no auth required)

POST /auth/signup
Body: {"email":"string","password":"string(min 8)"}
200: {"token":"jwt","user":{"id":"string","email":"string","plan":"BASIC|PRO|PRO_PLUS"}}
409: CONFLICT (email exists)

POST /auth/signin
Body: {"email":"string","password":"string"}
200: same as signup
401: UNAUTHORIZED

## API Keys (auth required)

POST /api-keys
Body: {"name":"string?"}
200: {"id":"string","name":"string?","keyPrefix":"mw_...","key":"mw_...full","createdAt":"date"}

GET /api-keys
200: [{"id":"string","name":"string?","keyPrefix":"string","revokedAt":"date?","createdAt":"date"}]

DELETE /api-keys/:id
200: revoked key object
404: NOT_FOUND, 409: CONFLICT (already revoked)

## Profile (auth required)

GET /me
200: {"id":"string","email":"string","plan":"BASIC|PRO|PRO_PLUS","walletAddress":"string?"}

PATCH /me
Body: {"walletAddress":"string?"}
200: updated profile
422: VALIDATION_ERROR (invalid address)

## Stats (auth required)

GET /stats
200: {"plan":"BASIC|PRO|PRO_PLUS","mintsUsed":0,"mintsRemaining":100,"periodStart":"date","periodEnd":"date"}

## Tokens (auth required)

GET /tokens
200: [{"address":"0x","type":"ERC20|ERC721","name":"string","symbol":"string","createdAt":"date"}]

POST /tokens (consumes 1 mint quota)
ERC20 body: {"type":"ERC20","name":"string(max 25)","symbol":"string(max 5)","decimals":0-18,"isPermissionless":bool}
ERC721 body: {"type":"ERC721","name":"string(max 25)","symbol":"string(max 5)","isPermissionless":bool}
200: {"success":true,"data":{"address":"0x","type":"...","name":"...","symbol":"...","createdAt":"date","transaction":{"hash":"0x","explorerUrl":"url"}}}
403: QUOTA_EXCEEDED, 422: VALIDATION_ERROR|BASE_URI_TOO_LONG, 502: CHAIN_ERROR, 503: DEPLOY_UNAVAILABLE

GET /tokens/:address
200: {"address":"0x","type":"ERC20|ERC721","name":"string","symbol":"string","paused":bool,"permissionless":bool,"owner":"0x","creator":"string"}
403: FORBIDDEN, 404: NOT_FOUND

POST /tokens/:address/mint (consumes 1 mint quota)
ERC20 body: {"owner":"0x","amount":"string(wei)"}
ERC721 body: {"owner":"0x"}
200: {"success":true,"data":{"transaction":{"hash":"0x","explorerUrl":"url"}}}

POST /tokens/:address/pause — no body, 200: {"success":true}
POST /tokens/:address/unpause — no body, 200: {"success":true}
POST /tokens/:address/freeze — body: {"account":"0x"}, 200: {"success":true}
POST /tokens/:address/unfreeze — body: {"account":"0x"}, 200: {"success":true}
POST /tokens/:address/approve-account — body: {"account":"0x"}, 200: {"success":true}
POST /tokens/:address/unapprove-account — body: {"account":"0x"}, 200: {"success":true}

PUT /tokens/:address/metadata
ERC20 body: {"name":"string","description":"string","image":"uri?","attributes":{"key":"string|number|bool"}(max 13 keys)}
ERC721 body: {"tokenId":"string","name":"string","description":"string","image":"uri?","attributes":{"key":"string|number|bool"}(max 13 keys)}
200: {"success":true}
422: VALIDATION_ERROR (e.g. too many attribute keys)

GET /tokens/:address/metadata/keys
200: {"keys":["string"]}

## Token URI (public)

GET /tokenURI/:address/:tokenId?
ERC20: omit tokenId
ERC721: tokenId required
200: {"name":"string","description":"string","image":"string","attributes":{"key":"string|number|bool"}}
404: NOT_FOUND, 502: CHAIN_ERROR

## Error codes

UNAUTHORIZED(401), FORBIDDEN(403), NOT_FOUND(404), CONFLICT(409), VALIDATION_ERROR(422), BASE_URI_TOO_LONG(422), QUOTA_EXCEEDED(403), CHAIN_ERROR(502), DEPLOY_UNAVAILABLE(503), INTERNAL_ERROR(500)

## Typical flow

1. POST /auth/signup → save token
2. POST /api-keys → save mw_ key (optional)
3. GET /stats → check quota
4. POST /tokens → deploy, save address
5. POST /tokens/:address/mint → mint
6. Host image on IPFS or CDN → save URI
7. PUT /tokens/:address/metadata → set structured metadata with image URI
8. GET /tokenURI/:address/:tokenId → verify JSON metadata
