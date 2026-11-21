---
title: Access tokens
description: Exchange an App Secret for a bearer token. The Publishable Key is only for the card.
sidebar:
  order: 1
---

## What this page is for

`POST /v1/token` turns an App ID and App Secret into an access token. List, detail, currency, and price requests then send that token as a bearer token. A browser card sends a Publishable Key instead. The secret is never placed in a URL.

## When to use it

Use the token from your server. Use the Publishable Key only in the page that loads `embed.js`. Keep the App Secret off the page and out of a public repository.

## Request

```bash
curl -X POST "https://api.gochina.cool/v1/token" \
  -H "Content-Type: application/json" \
  -d '{"appId":"10001","appSecret":"your_app_secret","grantType":"client_credentials"}'
```

When `expiresInSeconds` has elapsed, refresh the access token. Do not send the App Secret again:

```bash
curl -X POST "https://api.gochina.cool/v1/token" \
  -H "Content-Type: application/json" \
  -d '{"appId":"10001","grantType":"refresh_token","refreshToken":"your_refresh_token"}'
```

`appId`, `appSecret`, `grantType`, and `refreshToken` are JSON strings. `grantType` is `client_credentials` or `refresh_token`. Any other value returns HTTP 400 with `error` set to `invalid_grant_type`.

`GET /v1/token` does not accept a secret. It returns HTTP 401.

## Response

A successful call is a flat JSON object:

```json
{
  "apiVersion": "v1",
  "accessToken": "your_access_token",
  "expiresInSeconds": 2592000,
  "refreshToken": "your_refresh_token",
  "refreshTokenExpiresInSeconds": 94694400,
  "tokenType": "Bearer"
}
```

| Field | Meaning |
| --- | --- |
| `accessToken` | Send this as `Authorization: Bearer`. |
| `expiresInSeconds` | Seconds until the access token expires. |
| `refreshToken` | Use this with `grantType` `refresh_token`. |
| `refreshTokenExpiresInSeconds` | Seconds until the refresh token expires. |
| `tokenType` | `Bearer`. |
| `apiVersion` | `v1`. |

Later server requests use:

```http
Authorization: Bearer your_access_token
```

`GET /v1/tours`, `GET /v1/tours/{tourCode}`, `GET /v1/prices`, and `GET /v1/currencies` accept only that header. `X-Publishable-Key` on those paths returns HTTP 401. The card uses the Publishable Key. See [Embed a card](/manual/embed/card/).

## Limits

IP allow lists are on unless GoChina turns them off for that application. A rejected address returns HTTP 403 and does not describe the allow list. An enabled application is required. Token, list, detail, currency, and price calls are limited to 10 requests per second for each application. HTTP 429 includes `Retry-After` in seconds.
