---
title: Q&A
description: Answers to the first questions, plus the shared status codes.
sidebar:
  order: 1
---

These are the questions that come up on the first integration. Each answer links to the page that states the rule. When an answer here and a linked page disagree, use the linked page.

### Why does a tour code return 404?

The code is not a published tour in the current itinerary structure. Older tours are absent from the list and return HTTP 404 with `available` set to `false`. The token is checked first, so a missing credential returns HTTP 401. See [Tours](/manual/tours/read/).

### Why does the list return only one page?

`GET /v1/tours` is paginated. Omitting `page` returns the first page of 20 tours, not every tour. `pageSize` cannot exceed 100. A page past the end returns HTTP 200 and an empty `tours` array. See [Tours](/manual/tours/read/).

### Where is the price on the tour document?

Prices are not on the list or the detail. Read them from `GET /v1/prices`. The amount is a reference price per adult for `referenceGroupSize` people. It is not a group total and it is not a child’s price. See [Prices](/manual/tours/prices/).

### Can the Publishable Key read the list, the detail, or the wholesale price?

No. The Publishable Key can load the card and `embed.js`. List, detail, currencies, and prices require `Authorization: Bearer`. The card shows the reference retail line only. See [Authentication](/manual/authentication/token/) and [Tour card](/manual/embed/card/).

### How do I show a price in another currency?

Pass up to three codes from [Currencies](/manual/currencies/codes/) to `GET /v1/prices`. The stored amounts stay in US dollars. The response converts those amounts. Do not send `USD`. On the card, `data-currency` changes only the sentence in `localizedDisplayLabel`.

### Why was the currency rejected?

A value that is not three letters returns `invalid_currency`. A three-letter code that is not in the currency table, including `USD`, returns `unsupported_currency` for the whole request. A listed code with no rate that day still returns the US dollar prices, and that currency has `conversionStatus` `rate_unavailable`. See [Currencies](/manual/currencies/codes/).

### What should I do with “Enquire for quote”?

Show the sentence. Do not parse it. The numbers used for calculation are the decimal strings in `amount`, `minimumAmount`, and `maximumAmount`. The real price is confirmed by enquiry.

### The token request used to be a GET. What changed?

`POST /v1/token` with a JSON body is the only way to exchange a secret. `expiresInSeconds` is the number of seconds until the access token expires. `GET /v1/token` does not accept a secret. See [Authentication](/manual/authentication/token/).

### Can I request another language or a departure date?

v1 has no `lang` or `date` parameter. Any unknown query parameter returns HTTP 400 and `error` `invalid_parameter`. The tour text is the published English text. `localName` is the local place name.

## Status codes

A credential or availability failure returns `apiVersion` and `available`. A malformed request returns `apiVersion` and `error`. Neither body describes the credential or the allow list. Each API page lists the errors for its own parameters. On a website card, show only `This tour is unavailable`.

The token is checked before a missing tour becomes 404.

| Condition | HTTP | Body | Correction |
| --- | --- | --- | --- |
| Missing or unknown credential | 401 | `available` `false` | Send `Authorization: Bearer` or, on the card only, `X-Publishable-Key`. |
| The application is disabled, or the allow list rejects the caller address | 403 | `available` `false` | The body does not describe the allow list. |
| The tour code is not a published current-structure tour | 404 | `available` `false` | Read the code from [Tours](/manual/tours/read/). |
| The call is rate limited | 429 | `available` `false`, plus `Retry-After` in seconds | Wait, then try again. |

```json
{
  "apiVersion": "v1",
  "available": false
}
```

Token, list, detail, currency, and price calls allow 10 requests per second for each application. The card allows 60 requests per second for each application and 10 requests per second for each visitor address.

HTTP 400 uses `error` and does not include `available`.

```json
{
  "apiVersion": "v1",
  "error": "invalid_parameter"
}
```

| `error` | Condition | Correction |
| --- | --- | --- |
| `invalid_parameter` | Unknown query parameter, including `lang` or `date`. | Remove it. |
| `invalid_page` | `page` is not an integer of 1 or more. | Send `page=1` or omit it. |
| `invalid_page_size` | `pageSize` is outside 1 to 100. | Send a value from 1 to 100, or omit it. |
| `invalid_grant_type` | `grantType` is not `client_credentials` or `refresh_token`. | See [Authentication](/manual/authentication/token/). |
| `invalid_tour_code` | A price request has a missing or malformed tour code. | Send `P` plus 10 digits. |
| `too_many_tour_codes` | More than 100 tour codes. | Split the request. |
| `duplicate_tour_code` | The same tour code appears twice. | Send each code once. |
| `invalid_currency` | A currency is not three letters. | Send an alphabetic code. |
| `unsupported_currency` | The code is not in the currency table, or it is `USD`. | See [Currencies](/manual/currencies/codes/). |
| `too_many_currencies` | More than 3 currencies. | Send at most 3. |
| `duplicate_currency` | The same currency appears twice. | Send each code once. |

A price request can still return HTTP 200 when one tour is unavailable or one listed currency has no rate that day. See [Prices](/manual/tours/prices/).
