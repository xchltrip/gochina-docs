---
title: Reference prices
description: Read per-adult reference prices in US dollars and up to three other currencies.
sidebar:
  order: 2
---

## What this page is for

`GET /v1/prices` reads the current reference price of one or more tours. Each tour has one US dollar reference retail price and one US dollar reference wholesale price. A `currency` parameter converts those two amounts. It does not read a second stored price.

The retail and wholesale amounts are per adult, for the party size in `referenceGroupSize`. They are not a group total and they are not a child’s price. The real price is confirmed by enquiry.

Currency codes are defined in [Currency codes](/manual/currencies/codes/).

## When to use it

Call this from your server with `Authorization: Bearer`. Do not cache the response. The header is `Cache-Control: no-store`.

## Request

```bash
curl "https://api.gochina.cool/v1/prices?tourCode=P2026110018&currency=EUR&currency=JPY" \
  -H "Authorization: Bearer your_access_token"
```

`tourCode` and `currency` may be repeated or comma-separated. Both forms are merged from left to right.

| Rule | Result |
| --- | --- |
| Missing or malformed tour code | HTTP 400, `invalid_tour_code` |
| More than 100 tour codes | `too_many_tour_codes` |
| Duplicate tour code | `duplicate_tour_code` |
| Currency is not three letters | `invalid_currency` |
| More than 3 currencies | `too_many_currencies` |
| Duplicate currency | `duplicate_currency` |
| `USD`, or a code that is not in the currency table | `unsupported_currency` |

Omit `currency` when you only need the US dollar amounts. Do not send `USD`.

## Response

```json
{
  "apiVersion": "v1",
  "prices": [
    {
      "tourCode": "P2026110018",
      "available": true,
      "priceUnit": "per_adult",
      "referenceGroupSize": 6,
      "referenceRetailPrice": {
        "type": "amount",
        "amount": "1880.00",
        "currency": "USD",
        "displayLabel": "From USD 1880.00 per adult, for a party of 6. Enquire for quote."
      },
      "referenceWholesalePrice": {
        "type": "amount",
        "amount": "1500.00",
        "currency": "USD"
      },
      "convertedPrices": [
        {
          "currency": "EUR",
          "baseCurrency": "USD",
          "exchangeRate": "0.91",
          "exchangeRateDate": "2026-11-21",
          "conversionStatus": "quoted",
          "referenceRetailPrice": {
            "type": "amount",
            "amount": "1710.80",
            "currency": "EUR"
          },
          "referenceWholesalePrice": {
            "type": "amount",
            "amount": "1365.00",
            "currency": "EUR"
          }
        }
      ]
    }
  ]
}
```

Amounts are decimal strings. Parse them with decimal arithmetic. `type` is `amount` or `range`. A range uses `minimumAmount` and `maximumAmount` and does not also include `amount`.

`displayLabel` is for people. Do not parse it. A range reads `USD 1000.00–1200.00 per adult, for a party of 6. Enquire for quote.` When the party size is missing, the party clause is omitted. When the retail amount is missing, the label is `Enquire for quote.`

`exchangeRate` is how many units of `currency` equal 1 USD, with up to 6 decimal places. `exchangeRateDate` is the rate date, not the date the tour price was edited. Some codes can be one business day behind the others.

`convertedPrices` contains only the currencies you requested. A listed currency with no rate that day has `conversionStatus` `rate_unavailable`, null amounts, and a null `exchangeRate`. The US dollar prices remain. Converted price objects do not include `displayLabel`.

A well-formed code that is not a published current-structure tour is HTTP 200 with `available` `false` and no price fields. Results follow the request order.

`referenceWholesalePrice` is `null` until a wholesale amount is published. Do not display that as zero.
