---
title: Errors and limits
description: Status codes, error names, and the two rate limits.
sidebar:
  order: 1
---

## What this page is for

Some failures are only `apiVersion` and `available`. A request that is malformed returns `apiVersion` and `error`. Neither body describes the credential or the allow list.

## When to use it

Use the HTTP status in your server logs. On a website card, show only the unavailable line.

## Authentication and availability

| Situation | HTTP status | Body |
| --- | --- | --- |
| Missing or unknown credential | 401 | `available` `false` |
| The application is disabled, or the allow list rejects the caller address | 403 | `available` `false` |
| The tour code is not a published current-structure tour | 404 | `available` `false` |
| The call is rate limited | 429 | `available` `false`, plus `Retry-After` in seconds |

```json
{
  "apiVersion": "v1",
  "available": false
}
```

The token is checked before a missing tour becomes 404.

## Malformed requests

HTTP 400 uses `error` and does not include `available`.

| `error` | Meaning |
| --- | --- |
| `invalid_parameter` | Unknown query parameter, including `lang` or `date`. |
| `invalid_page` | `page` is not an integer of 1 or more. |
| `invalid_page_size` | `pageSize` is outside 1 to 100. |
| `invalid_grant_type` | `grantType` is not `client_credentials` or `refresh_token`. |
| `invalid_tour_code` | A price request has a missing or malformed tour code. |
| `too_many_tour_codes` | More than 100 tour codes. |
| `duplicate_tour_code` | The same tour code appears twice. |
| `invalid_currency` | A currency is not three letters. |
| `unsupported_currency` | The code is not in the currency table, or it is `USD`. |
| `too_many_currencies` | More than 3 currencies. |
| `duplicate_currency` | The same currency appears twice. |

A price request can still return HTTP 200 when one tour is unavailable or one listed currency has no rate that day. See [Reference prices](/manual/tours/prices/).

## Limits

Token, list, detail, currency, and price calls allow 10 requests per second for each application. The card allows 60 requests per second for each application and 10 requests per second for each visitor address. On HTTP 429, wait for `Retry-After` and try again.
