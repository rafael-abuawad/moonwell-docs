# Media Uploads

Upload images for token metadata. Files are optimized to WebP via Bun's image processor and served publicly without authentication.

## Upload an image

Requires authentication and token ownership.

```bash
curl -X POST http://localhost:3001/tokens/0xADDRESS/media \
  -H "Authorization: Bearer <token>" \
  -F "file=@logo.png"
```

**Success response (200):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "url": "http://localhost:3001/tokens/0xADDRESS/media/550e8400-e29b-41d4-a716-446655440000",
  "width": 64,
  "height": 64,
  "size": 1234,
  "mimeType": "image/webp",
  "createdAt": "2026-06-10T12:00:00.000Z"
}
```

Use the `url` in [metadata values](/guides/manage-token#metadata).

## List media (public)

No authentication required.

```bash
curl http://localhost:3001/tokens/0xADDRESS/media
```

Returns an array of assets for the token.

## Serve an image (public)

```bash
curl http://localhost:3001/tokens/0xADDRESS/media/550e8400-e29b-41d4-a716-446655440000 \
  -o image.webp
```

Response `Content-Type`: `image/webp`

## Supported formats

Input images are converted to WebP. Supported input formats include PNG, JPEG, and WebP. Non-image files are rejected.

## Workflow

1. Deploy a token
2. Upload images via `POST /tokens/:address/media`
3. Reference the returned `url` in metadata values
4. Wallets resolve metadata via the [token URI endpoint](/guides/token-uri)

## Common errors

| Status | Code | Cause |
|--------|------|-------|
| 401 | `UNAUTHORIZED` | Upload without Bearer token |
| 403 | `FORBIDDEN` | Token not owned by caller |
| 404 | `NOT_FOUND` | Token or media asset not found |
| 422 | `VALIDATION_ERROR` | Missing file or unsupported format |
| 500 | `UPLOAD_FAILED` | Storage write failure |
