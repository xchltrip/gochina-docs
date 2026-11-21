---
title: Embed a card
description: Show one published tour card with a Publishable Key.
sidebar:
  order: 1
---

## What this page is for

`https://api.gochina.cool/embed.js` draws one card: cover, title, days, and the reference retail line. The card links to that tour’s GoChina page. It does not show the wholesale price.

## When to use it

Use it for the first tour on your website. Do not use the script to load the full list or the tour document.

## Request

```html
<div id="tour-card"></div>
<script
  src="https://api.gochina.cool/embed.js"
  data-key="pk_your_publishable_key"
  data-tour="P2026110018"
  data-currency="GBP"
  data-target="tour-card"
></script>
```

`data-key` is the Publishable Key. `data-tour` is the tour code. `data-target` is the id of the element that should hold the card. If that element is missing, the script inserts a card immediately before itself.

`data-currency` is optional and accepts one code from [Currency codes](/manual/currencies/codes/). An unknown code is ignored and the card keeps the US dollar line.

The script requests `GET /v1/tours/{tourCode}/card` with `X-Publishable-Key`. `https://api.gochina.cool/v1/embed.js` serves the same script.

## Card fields

| Field | Meaning |
| --- | --- |
| `code` | Formal tour code. |
| `title` | Published title. |
| `durationDays` | Number of itinerary days. |
| `websiteUrl` | GoChina page opened by the card. |
| `coverImageUrl` | List cover. |
| `referenceRetailPrice` | US dollar reference retail price, including `displayLabel`. |
| `localizedDisplayLabel` | The same sentence in the requested currency, or `null`. |

`referenceRetailPrice.amount` stays in US dollars. The script shows `localizedDisplayLabel` when it is present, and `displayLabel` otherwise. There is no converted amount field on the card.

## What the visitor sees

The card shows the cover, the title, and a line such as `15 days · From USD 1880.00 per adult, for a party of 6. Enquire for quote.` A click opens `websiteUrl` in a new tab.

## Limits

Any failure, including a network failure, replaces the card with the text `This tour is unavailable`. The card has no enquiry button. The same script address can change how the card looks later. Use the JSON fields when you need a stable set of values.

The card is limited to 60 requests per second for each application and 10 requests per second for each visitor address. List, detail, and price calls do not share that allowance.
