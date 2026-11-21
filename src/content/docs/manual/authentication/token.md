---
title: Authentication
description: Exchange an App Secret for a bearer token. The Publishable Key is only for the card.
sidebar:
  order: 1
---

`POST /v1/token` exchanges an App ID and App Secret for an access token. List, detail, currency, and price requests then send that token as `Authorization: Bearer`. A browser card sends `X-Publishable-Key` instead. The secret is a JSON string in the body, never a query parameter.

Keep the App Secret on your server. `GET /v1/token` does not accept a secret and returns HTTP 401.

## Parameters

| Name | In | Required | Description |
| --- | --- | --- | --- |
| `Content-Type` | header | yes | `application/json`. |
| `appId` | body | yes | String, such as `"10001"`. A JSON number is rejected. |
| `appSecret` | body | for a new token | Server only. Do not send it again when refreshing. |
| `grantType` | body | yes | `client_credentials` or `refresh_token`. |
| `refreshToken` | body | for a refresh | The refresh token from the previous response. |

## Example: client credentials

```bash
curl -X POST "https://api.gochina.cool/v1/token" \
  -H "Content-Type: application/json" \
  -d '{"appId":"10001","appSecret":"your_app_secret","grantType":"client_credentials"}'
```

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

### Response fields

| Field | Type | Content |
| --- | --- | --- |
| `apiVersion` | string | Contract version. Always `v1`. |
| `accessToken` | string | Send this value on later server calls. |
| `expiresInSeconds` | integer | Seconds until `accessToken` expires, counted from this response. Not a unix timestamp. |
| `refreshToken` | string | Send this value to `grantType` `refresh_token`. |
| `refreshTokenExpiresInSeconds` | integer | Seconds until `refreshToken` expires, counted from this response. |
| `tokenType` | string | Always `Bearer`. |

Send the access token on later server calls:

```http
Authorization: Bearer your_access_token
```

`GET /v1/tours`, `GET /v1/tours/{tourCode}`, `GET /v1/prices`, and `GET /v1/currencies` accept only that header. `X-Publishable-Key` on those paths returns HTTP 401. The card uses the Publishable Key. See [Tour card](/manual/embed/card/).

## Example: refresh

When `expiresInSeconds` has elapsed, exchange the refresh token. Do not send the App Secret again.

```bash
curl -X POST "https://api.gochina.cool/v1/token" \
  -H "Content-Type: application/json" \
  -d '{"appId":"10001","grantType":"refresh_token","refreshToken":"your_refresh_token"}'
```

The success body has the same fields as the client-credentials response.

## Errors

| Condition | HTTP | Body | Correction |
| --- | --- | --- | --- |
| `grantType` is any other value | 400 | `error` `invalid_grant_type` | Send `client_credentials` or `refresh_token`. |
| The id or secret does not match, or the refresh token is unknown | 401 | `available` `false` | The body does not say which field failed. |
| The application is disabled, or the caller address is not allowed | 403 | `available` `false` | The body does not describe the allow list. |
| More than 10 requests per second for this application | 429 | `available` `false` | Wait for `Retry-After`, in seconds. |

IP allow lists apply unless GoChina turns them off for that application. The application must be enabled.
