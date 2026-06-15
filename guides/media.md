# Media Uploads

Upload images for token metadata. Files are optimized to WebP via Bun's image processor and served publicly without authentication.

## Storage drivers

Media storage is controlled by `STORAGE_DRIVER`:

| Driver | Use case | Upload target | Public URL |
|--------|----------|---------------|------------|
| `local` (default) | Local dev and tests | `UPLOAD_DIR` on disk | `PUBLIC_API_URL/tokens/.../media/...` via API |
| `s3` | Production on Railway | Railway Bucket (S3-compatible) | `MEDIA_PUBLIC_BASE_URL/media/...` via Public URL service |

In **local** mode, the API serves files from `GET /tokens/:address/media/:id`.

In **s3** mode, uploads go to the bucket and `url` in API responses points at your CDN-style public base URL. The API does not serve file bytes from disk.

See [Railway media storage](/deployment/railway-media-storage) for production bucket setup.

## Upload an image

Requires authentication and token ownership.

```bash
curl -X POST http://localhost:3001/tokens/0xADDRESS/media \
  -H "Authorization: Bearer <token>" \
  -F "file=@logo.png"
```

**Success response (200) — local driver:**

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

**Success response (200) — s3 driver:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "url": "https://media.yourdomain.com/media/user-id/0xADDRESS/550e8400-e29b-41d4-a716-446655440000.webp",
  "width": 64,
  "height": 64,
  "size": 1234,
  "mimeType": "image/webp",
  "createdAt": "2026-06-10T12:00:00.000Z"
}
```

Use the `url` in [metadata values](/guides/manage-token#metadata). Wallets and browsers load images directly from that URL.

## List media (public)

No authentication required.

```bash
curl http://localhost:3001/tokens/0xADDRESS/media
```

Returns an array of assets for the token.

## Serve an image (local driver only)

When `STORAGE_DRIVER=local`, images are also available through the API:

```bash
curl http://localhost:3001/tokens/0xADDRESS/media/550e8400-e29b-41d4-a716-446655440000 \
  -o image.webp
```

Response `Content-Type`: `image/webp`

With `STORAGE_DRIVER=s3`, use the `url` returned from upload or list instead.

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `STORAGE_DRIVER` | `local` | `local` or `s3` |
| `UPLOAD_DIR` | `./uploads` | Local filesystem root (local driver only) |
| `PUBLIC_API_URL` | `http://localhost:3001` | Base URL for local media links |
| `S3_BUCKET` | — | Bucket name (required when `STORAGE_DRIVER=s3`) |
| `S3_ENDPOINT` | `https://storage.railway.app` | S3-compatible endpoint |
| `S3_REGION` | `auto` | Bucket region |
| `S3_ACCESS_KEY_ID` | — | Bucket access key |
| `S3_SECRET_ACCESS_KEY` | — | Bucket secret key |
| `MEDIA_PUBLIC_BASE_URL` | — | Public CDN base URL (required when `STORAGE_DRIVER=s3`) |

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
