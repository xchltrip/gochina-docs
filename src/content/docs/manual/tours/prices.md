---
title: Prices
description: Read per-adult reference prices in US dollars and up to three other currencies.
sidebar:
  order: 2
---

`GET /v1/prices` returns the current reference retail price and reference wholesale price for one or more tours. Both amounts are per adult, for the party size in `referenceGroupSize`. A `currency` parameter converts those US dollar amounts. It does not read a second stored price.

Call this from your server with `Authorization: Bearer`. The response is `Cache-Control: no-store`. Currency codes are listed in [Currencies](/manual/currencies/codes/). Children’s prices are not in the response. The real price is confirmed by enquiry.

## Parameters

| Name | In | Required | Description |
| --- | --- | --- | --- |
| `Authorization` | header | yes | Bearer token. A Publishable Key returns HTTP 401. |
| `tourCode` | query | yes | String. `P` plus 10 digits. Repeat it or use commas. 1 to 100 codes, no duplicates. |
| `currency` | query | no | String. Up to 3 codes from [Currencies](/manual/currencies/codes/). Do not send `USD`. Omit it for US dollars only. |

## Example request

```bash
curl "https://api.gochina.cool/v1/prices?tourCode=P2026110018&currency=EUR&currency=JPY" \
  -H "Authorization: Bearer your_access_token"
```

## Example response

The request asks for `EUR` and `JPY`, so `convertedPrices` contains both, in that order. Amounts are decimal strings. Parse them with decimal arithmetic.

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
        },
        {
          "currency": "JPY",
          "baseCurrency": "USD",
          "exchangeRate": "159.42",
          "exchangeRateDate": "2026-11-21",
          "conversionStatus": "quoted",
          "referenceRetailPrice": {
            "type": "amount",
            "amount": "299710",
            "currency": "JPY"
          },
          "referenceWholesalePrice": {
            "type": "amount",
            "amount": "239130",
            "currency": "JPY"
          }
        }
      ]
    }
  ]
}
```

### Response fields

Results follow the request’s `tourCode` order. Amounts are decimal strings. Parse them with decimal arithmetic. `JPY`, `KRW`, and `VND` have no decimal places.

| Field | Type | Content |
| --- | --- | --- |
| `apiVersion` | string | Contract version. Always `v1`. |
| `prices` | array of object | One object per requested tour code. |
| `prices[].tourCode` | string | The tour code from the request. |
| `prices[].available` | boolean | `true` when the price fields below are present. `false` when the code is not a published current-structure tour. That object has no other fields. |
| `prices[].priceUnit` | string | Always `per_adult`. The amount is not a group total and not a child’s price. |
| `prices[].referenceGroupSize` | integer \| null | Party size the price assumes. Not remaining seats. `null` omits the party clause from `displayLabel`. |
| `prices[].referenceRetailPrice` | object | US dollar reference retail price. Always present when `available` is `true`. |
| `prices[].referenceWholesalePrice` | object \| null | US dollar reference wholesale price. `null` until a wholesale amount is published. Do not display that as zero. |
| `prices[].convertedPrices` | array of object | One object per requested currency, in request order. Empty when `currency` is omitted. |

#### Price object

`referenceRetailPrice` and `referenceWholesalePrice` use this object. An amount and a range are never mixed in the same object. `displayLabel` is only on the US dollar retail price. Show it as written. Do not parse it.

| Field | Type | Content |
| --- | --- | --- |
| `type` | string | `amount` or `range`. Absent when no retail amount is published. |
| `amount` | string \| null | Decimal amount when `type` is `amount`. `null`, with no `type`, when the retail amount is missing. Absent when `type` is `range`. |
| `minimumAmount` | string | Low end of a range. Present only when `type` is `range`. |
| `maximumAmount` | string | High end of a range. Present only when `type` is `range`. |
| `currency` | string | ISO 4217 code. `USD` on the stored prices. |
| `displayLabel` | string | Sentence for people. Only on `referenceRetailPrice` in US dollars. Missing amount: `Enquire for quote.` |

#### `convertedPrices[]`

| Field | Type | Content |
| --- | --- | --- |
| `currency` | string | Requested ISO 4217 code. |
| `baseCurrency` | string | Always `USD`. |
| `exchangeRate` | string \| null | Units of `currency` for 1 USD. At most 6 decimal places, trailing zeros omitted. `null` when `conversionStatus` is `rate_unavailable`. |
| `exchangeRateDate` | string \| null | Rate date, `YYYY-MM-DD`. Not the date the tour price was edited. `TWD`, `VND`, and `MOP` can be one business day behind the other codes. |
| `conversionStatus` | string | `quoted` or `rate_unavailable`. |
| `referenceRetailPrice` | object \| null | Converted retail price. A price object without `displayLabel`. `null` when the rate or the US dollar retail amount is missing. |
| `referenceWholesalePrice` | object \| null | Converted wholesale price, without `displayLabel`. `null` when the rate is missing or no wholesale amount is published. |

## Other shapes

A retail range uses `minimumAmount` and `maximumAmount`. The same object does not also include `amount`.

```json
{
  "type": "range",
  "minimumAmount": "1000.00",
  "maximumAmount": "1200.00",
  "currency": "USD",
  "displayLabel": "USD 1000.00–1200.00 per adult, for a party of 6. Enquire for quote."
}
```

A well-formed code that is not a published current-structure tour stays in the array. HTTP status is still 200. That item has no price fields.

```json
{
  "tourCode": "P2026110099",
  "available": false
}
```

A listed currency with no rate that day does not remove the US dollar prices. That currency has null amounts and a null `exchangeRate`.

```json
{
  "currency": "EUR",
  "baseCurrency": "USD",
  "exchangeRate": null,
  "exchangeRateDate": null,
  "conversionStatus": "rate_unavailable",
  "referenceRetailPrice": null,
  "referenceWholesalePrice": null
}
```

## Errors

A malformed price request fails as a whole. HTTP 400 has `apiVersion` and `error`, and no `available`.

| Condition | HTTP | `error` | Correction |
| --- | --- | --- | --- |
| `tourCode` is missing or not `P` plus 10 digits | 400 | `invalid_tour_code` | Send one formal tour code. |
| More than 100 tour codes | 400 | `too_many_tour_codes` | Split the request. |
| The same tour code appears twice | 400 | `duplicate_tour_code` | Send each code once. |
| A currency is not three letters | 400 | `invalid_currency` | Send an alphabetic ISO 4217 code. |
| The code is not in the currency table, or it is `USD` | 400 | `unsupported_currency` | Use a code from [Currencies](/manual/currencies/codes/). Omit `currency` for US dollars. |
| More than 3 currencies | 400 | `too_many_currencies` | Send at most 3. |
| The same currency appears twice | 400 | `duplicate_currency` | Send each code once. |
| Any other query parameter | 400 | `invalid_parameter` | Remove it. There is no `lang` or `date`. |
