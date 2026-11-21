---
title: Embed a card
description: Show one published tour card with a Publishable Key.
sidebar:
  order: 1
---

## What this page is for

`/v1/embed.js` draws one card: cover, title, days, and the reference-price line. The card links to that tour’s GoChina page.

## When to use it

Use it for the first tour on your website. Do not use the script to load the full list.

## Request

```html
<div id="tour-card"></div>
<script
  src="https://api.gochina.cool/v1/embed.js"
  data-key="pk_your_publishable_key"
  data-tour="P2026110001"
  data-target="tour-card"
></script>
```

`data-key` is the Publishable Key. `data-tour` is the tour code. `data-target` is the id of the element that should hold the card. If that element is missing, the script inserts a card immediately before itself.

The script requests `https://api.gochina.cool/v1/tours/{code}` with `X-Publishable-Key`.

## What the visitor sees

The card shows the cover, the title, and a line such as `6 days · From USD 1200. Enquire for quote.` A click opens `detailUrl` in a new tab. The sample tour opens `https://gochina.cool/tours/nujiang-canyon-meili-snow-mountain-6-day-tour/`.

## Limits

Any failure, including a network failure, replaces the card with the text `This tour is unavailable`. The card has no enquiry button. The same `/v1/embed.js` address can change how the card looks later. Use the JSON fields when you need a stable set of values.
