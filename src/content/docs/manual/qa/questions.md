---
title: Q&A
description: Answers to the first questions about credentials, tours, and reference prices.
sidebar:
  order: 1
---

## What this page is for

These are the questions that come up on the first integration. Each answer links to the page that states the rule.

## When to use it

Read this page when a call returns a status or a field you did not expect. Use the linked page before changing the request.

## Questions

### Why does a tour code return 404?

The code is not a published tour in the current itinerary structure. Older tours are absent from the list and return HTTP 404 with `available` set to `false`. The token is checked first, so a missing credential returns HTTP 401. See [Read tours](/manual/tours/read/).

### Why does the list return only one page?

`GET /v1/tours` is paginated. Omitting `page` returns the first page of 20 tours, not every tour. `pageSize` cannot exceed 100. A page past the end returns HTTP 200 and an empty `tours` array. See [Read tours](/manual/tours/read/).

### Where is the price on the tour document?

Prices are not on the list or the detail. Read them from `GET /v1/prices`. The amount is a reference price per adult for `referenceGroupSize` people. It is not a group total and it is not a child’s price. See [Reference prices](/manual/tours/prices/).

### Can the Publishable Key read the list, the detail, or the wholesale price?

No. The Publishable Key can load the card and `embed.js`. List, detail, currencies, and prices require `Authorization: Bearer`. The card shows the reference retail line only. See [Access tokens](/manual/authentication/token/) and [Embed a card](/manual/embed/card/).

### How do I show a price in another currency?

Pass up to three codes from [Currency codes](/manual/currencies/codes/) to `GET /v1/prices`. The stored amounts stay in US dollars. The response converts those amounts. Do not send `USD`. On the card, `data-currency` changes only the sentence in `localizedDisplayLabel`.

### Why was the currency rejected?

A value that is not three letters returns `invalid_currency`. A three-letter code that is not in the currency table, including `USD`, returns `unsupported_currency` for the whole request. A listed code with no rate that day still returns the US dollar prices, and that currency has `conversionStatus` `rate_unavailable`. See [Currency codes](/manual/currencies/codes/).

### What should I do with “Enquire for quote”?

Show the sentence. Do not parse it. The numbers used for calculation are the decimal strings in `amount`, `minimumAmount`, and `maximumAmount`. The real price is confirmed by enquiry.

### The token request used to be a GET. What changed?

`POST /v1/token` with a JSON body is the only way to exchange a secret. `expiresInSeconds` is the number of seconds until the access token expires. `GET /v1/token` does not accept a secret. See [Access tokens](/manual/authentication/token/).

### Can I request another language or a departure date?

v1 has no `lang` or `date` parameter. Any unknown query parameter returns HTTP 400 and `error` `invalid_parameter`. The tour text is the published English text. `localName` is the local place name.

## Limits

This page does not add fields or paths. When an answer here and a linked page disagree, use the linked page.
