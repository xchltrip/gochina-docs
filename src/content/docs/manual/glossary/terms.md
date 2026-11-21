---
title: Terms
description: Names used throughout the GoChina Open Platform docs.
sidebar:
  order: 1
---

## What this page is for

These names stay the same on every page. Use them when you read a response or send a request.

## When to use it

Read this page before the first request if a field name is new.

## Terms

| Term | Meaning |
| --- | --- |
| App ID | The numeric id GoChina sends you for one application. Send it as a JSON string. |
| App Secret | The private credential used only on your server to obtain an access token. |
| Publishable Key | The `pk_` credential used by the website card. It is safe to place in a page script. |
| tour code | A published tour id shaped as `P` plus 10 digits, such as `P2026110018`. |
| reference retail price | A per-adult guide price for the published party size. It is not a bookable rate. |
| reference wholesale price | A per-adult guide price for trade partners. It is not a settlement price. |
| currency code | An [ISO 4217](/manual/currencies/codes/) alphabetic code, such as `EUR`. |
| base currency | `USD`. Stored reference prices are in US dollars. |
| minor units | The number of decimal places for a currency amount. Yen, won, and dong use `0`. |
| `apiVersion` | The contract version. For the current paths it is `v1`. |

## Limits

Field names in JSON stay in English in every example. v1 content is the published English text. There is no language parameter and no departure date.
