---
title: Currencies
description: ISO 4217 codes GoChina can convert from US dollars.
sidebar:
  order: 1
---

A currency identifier is the ISO 4217 alphabetic code. Requests and responses use that three-letter code. Case does not matter on input. Responses use uppercase. This page is the only currency list. [Prices](/manual/tours/prices/) and [Tour card](/manual/embed/card/) link here.

`GET /v1/currencies` returns the convertible codes. `USD` is the base currency and is not one of the rows. Reference prices are always stored in US dollars. Do not send `USD` to `currency` or `data-currency`.

## Parameters

| Name | In | Required | Description |
| --- | --- | --- | --- |
| `Authorization` | header | yes | Bearer token. A Publishable Key returns HTTP 401. |

This call takes no query parameters. Any query parameter returns HTTP 400 and `error` `invalid_parameter`.

## Example request

```bash
curl "https://api.gochina.cool/v1/currencies" \
  -H "Authorization: Bearer your_access_token"
```

## Example response

The array below is the complete v1 list, in response order. Amounts elsewhere are rounded half up to `minorUnits` decimal places.

### Response fields

| Field | Type | Content |
| --- | --- | --- |
| `apiVersion` | string | Contract version. Always `v1`. |
| `baseCurrency` | string | Always `USD`. Not one of the rows in `currencies`. |
| `currencies` | array of object | Convertible codes, in the order below. |
| `currencies[].currency` | string | ISO 4217 alphabetic code, uppercase. |
| `currencies[].currencyName` | string | English currency name. |
| `currencies[].minorUnits` | integer | Decimal places for an amount in this currency. `JPY`, `KRW`, and `VND` are `0`. Every other row is `2`. |

```json
{
  "apiVersion": "v1",
  "baseCurrency": "USD",
  "currencies": [
    { "currency": "AED", "currencyName": "UAE Dirham", "minorUnits": 2 },
    { "currency": "AUD", "currencyName": "Australian Dollar", "minorUnits": 2 },
    { "currency": "CAD", "currencyName": "Canadian Dollar", "minorUnits": 2 },
    { "currency": "CHF", "currencyName": "Swiss Franc", "minorUnits": 2 },
    { "currency": "CNY", "currencyName": "Chinese Yuan", "minorUnits": 2 },
    { "currency": "EUR", "currencyName": "Euro", "minorUnits": 2 },
    { "currency": "GBP", "currencyName": "British Pound", "minorUnits": 2 },
    { "currency": "HKD", "currencyName": "Hong Kong Dollar", "minorUnits": 2 },
    { "currency": "IDR", "currencyName": "Indonesian Rupiah", "minorUnits": 2 },
    { "currency": "INR", "currencyName": "Indian Rupee", "minorUnits": 2 },
    { "currency": "JPY", "currencyName": "Japanese Yen", "minorUnits": 0 },
    { "currency": "KRW", "currencyName": "South Korean Won", "minorUnits": 0 },
    { "currency": "MOP", "currencyName": "Macanese Pataca", "minorUnits": 2 },
    { "currency": "MYR", "currencyName": "Malaysian Ringgit", "minorUnits": 2 },
    { "currency": "NZD", "currencyName": "New Zealand Dollar", "minorUnits": 2 },
    { "currency": "PHP", "currencyName": "Philippine Peso", "minorUnits": 2 },
    { "currency": "RUB", "currencyName": "Russian Ruble", "minorUnits": 2 },
    { "currency": "SAR", "currencyName": "Saudi Riyal", "minorUnits": 2 },
    { "currency": "SGD", "currencyName": "Singapore Dollar", "minorUnits": 2 },
    { "currency": "THB", "currencyName": "Thai Baht", "minorUnits": 2 },
    { "currency": "TWD", "currencyName": "New Taiwan Dollar", "minorUnits": 2 },
    { "currency": "VND", "currencyName": "Vietnamese Dong", "minorUnits": 0 }
  ]
}
```

Numeric codes, currency symbols, and currency names are rejected. A three-letter code that is not in this list returns HTTP 400 and `error` `unsupported_currency` on [Prices](/manual/tours/prices/). A listed code with no rate that day still returns the US dollar prices, and that currency has `conversionStatus` `rate_unavailable`.

v1 does not accept every ISO 4217 code. These codes are not accepted: `SEK`, `NOK`, `DKK`, `BRL`, `MXN`, `ZAR`, `TRY`, `PLN`, `ILS`, `QAR`, `KWD`, `BHD`.

Adding or removing a code changes this page, `GET /v1/currencies`, and the OpenAPI enum on the same day.
