---
title: Currency codes
description: ISO 4217 codes GoChina can convert from US dollars.
sidebar:
  order: 1
---

## What this page is for

A currency identifier is the ISO 4217 alphabetic code. Requests and responses use that three-letter code. Case does not matter on input. Responses use uppercase.

This page is the only currency list. [Reference prices](/manual/tours/prices/) and [Embed a card](/manual/embed/card/) link here instead of copying it.

## Rules

| Rule | Meaning |
| --- | --- |
| Identifier | Three letters, such as `EUR`. |
| Rejected input | Numeric codes, currency symbols, and currency names. |
| Base currency | `USD`, with 2 minor units. Reference prices are always stored in US dollars. Do not send `USD` to `currency` or `data-currency`. |
| Minor units | Amounts are decimal strings, rounded half up to this many places. `JPY`, `KRW`, and `VND` have no decimal places. |
| Unknown code | A code that is not in the table below returns HTTP 400 and `error` `unsupported_currency` on the price API. |
| Missing rate | A listed code with no rate that day still returns the US dollar prices. That currency has `conversionStatus` `rate_unavailable`. |

`GET /v1/currencies` returns the same rows, in this order, with `currency`, `currencyName`, and `minorUnits`. It requires a bearer token. `baseCurrency` is `USD` and is not one of the rows.

v1 does not list every ISO 4217 code. These codes are not accepted: `SEK`, `NOK`, `DKK`, `BRL`, `MXN`, `ZAR`, `TRY`, `PLN`, `ILS`, `QAR`, `KWD`, `BHD`.

## Convertible currencies

| `currency` | `currencyName` | `minorUnits` |
| --- | --- | --- |
| `AED` | UAE Dirham | 2 |
| `AUD` | Australian Dollar | 2 |
| `CAD` | Canadian Dollar | 2 |
| `CHF` | Swiss Franc | 2 |
| `CNY` | Chinese Yuan | 2 |
| `EUR` | Euro | 2 |
| `GBP` | British Pound | 2 |
| `HKD` | Hong Kong Dollar | 2 |
| `IDR` | Indonesian Rupiah | 2 |
| `INR` | Indian Rupee | 2 |
| `JPY` | Japanese Yen | 0 |
| `KRW` | South Korean Won | 0 |
| `MOP` | Macanese Pataca | 2 |
| `MYR` | Malaysian Ringgit | 2 |
| `NZD` | New Zealand Dollar | 2 |
| `PHP` | Philippine Peso | 2 |
| `RUB` | Russian Ruble | 2 |
| `SAR` | Saudi Riyal | 2 |
| `SGD` | Singapore Dollar | 2 |
| `THB` | Thai Baht | 2 |
| `TWD` | New Taiwan Dollar | 2 |
| `VND` | Vietnamese Dong | 0 |

Adding or removing a code changes this page, `GET /v1/currencies`, and the OpenAPI enum on the same day.
