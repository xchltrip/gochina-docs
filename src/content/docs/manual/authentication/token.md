---
title: Access tokens
description: Exchange an App Secret for a bearer token, or call the card API with a Publishable Key.
sidebar:
  order: 1
---

## What this page is for

`GET /v1/token` turns an App ID and App Secret into an access token. Tour requests then send that token as a bearer token. A browser card sends a Publishable Key instead.

## When to use it

Use the token from your server. Use the Publishable Key only in the page that loads `/v1/embed.js`. Keep the App Secret off the page and out of a public repository.

## Request

```bash
curl "https://api.gochina.cool/v1/token?appId=10001&appSecret=your_app_secret&grantType=clientCredentials"
```

When `expireIn` has passed, request a new token:

```bash
curl "https://api.gochina.cool/v1/token?appId=10001&appSecret=your_app_secret&grantType=refreshToken&refreshToken=your_refresh_token"
```

Read `expireIn` from the response and compare it with the current Unix time. Do not hard-code a lifetime.

## Response

A successful call uses this envelope. The token fields sit inside `data`:

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "accessToken": "your_access_token",
    "expireIn": 1797856465,
    "refreshToken": "your_refresh_token",
    "refreshTokenExpireIn": 1889958865,
    "tokenType": "Bearer",
    "apiVersion": "v1"
  }
}
```

| Field | Meaning |
| --- | --- |
| `accessToken` | Send this as `Authorization: Bearer`. |
| `expireIn` | Unix time, in seconds, when the access token expires. |
| `refreshToken` | Use this with `grantType=refreshToken`. |
| `refreshTokenExpireIn` | Unix time, in seconds, when the refresh token expires. |
| `tokenType` | `Bearer`. |
| `apiVersion` | `v1`. |

This envelope is not the same shape as a tour document. A tour document is a flat JSON object. See [Read tours](/manual/tours/read/).

Later tour requests use:

```http
Authorization: Bearer your_access_token
```

`GET /v1/tours` and `GET /v1/tours/{code}` also accept `X-Publishable-Key`. Prefer the bearer token on a server. The card uses the Publishable Key.

## Limits

IP allow lists are on unless GoChina turns them off for that application. A card on a public page must have the allow list turned off, or visitor addresses are rejected. An enabled application is required. This page does not document any path other than `/v1/token`.
