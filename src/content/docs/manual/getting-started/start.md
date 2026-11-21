---
title: Overview
description: Use a private credential to show one published GoChina tour.
sidebar:
  order: 1
---

GoChina sends the credential to you. This site does not offer an application form, and it never displays a real secret. Show one published tour on your own website with the card, or render the tour from the JSON API on your server.

The price is a reference price per adult for the published party size. It includes the line “Enquire for quote.” Children’s prices are not in the response. The card does not take a booking. v1 has no language parameter and no departure date.

## Credentials

| Name | Example | Constraint |
| --- | --- | --- |
| App ID | `10001` | Send it as a JSON string. |
| App Secret | `your_app_secret` | Server only. |
| Publishable Key | `pk_your_publishable_key` | Card only. |
| API base | `https://api.gochina.cool` | |
| Docs | `https://docs.gochina.cool/` | |
| Sample tour code | `P2026110018` | `P` plus 10 digits. |

The API returns only published tours that use the current itinerary structure. Older tours are absent. The application must be enabled, and the server address must be registered before the first call.

## Choose a path

1. Add `https://api.gochina.cool/embed.js` to a page and pass the Publishable Key. See [Tour card](/manual/embed/card/).
2. Exchange the App Secret for a token, then call the paths under API from your server. See [Authentication](/manual/authentication/token/), [Tours](/manual/tours/read/), and [Prices](/manual/tours/prices/).

The API group in the sidebar is every call. Short answers and the shared status codes are on [Q&A](/manual/qa/questions/).

## Terms

| Term | Meaning |
| --- | --- |
| tour code | A published tour id shaped as `P` plus 10 digits, such as `P2026110018`. |
| reference retail price | A per-adult guide price for the published party size. It is not a bookable rate. |
| reference wholesale price | A per-adult guide price for trade partners. It is not a settlement price. |
| currency code | An [ISO 4217](/manual/currencies/codes/) alphabetic code, such as `EUR`. |
| base currency | `USD`. Stored reference prices are in US dollars. |
| minor units | The number of decimal places for a currency amount. Yen, won, and dong use `0`. |
| `apiVersion` | The contract version. For the current paths it is `v1`. |
