---
title: Read tours
description: List published tours or read one tour, including its day-by-day content.
sidebar:
  order: 1
---

## What this page is for

`GET /v1/tours` lists every published tour with a formal tour code. `GET /v1/tours/{code}` returns one tour, including the day-by-day content.

## When to use it

Use the list to discover codes. Use the detail when you render one tour yourself. The website card is a separate, smaller view. See [Embed a card](/manual/embed/card/).

## List

```bash
curl "https://api.gochina.cool/v1/tours" \
  -H "Authorization: Bearer your_access_token"
```

The list has no query parameters. It returns every published formal tour in one response. Each item has only:

| Field | Meaning |
| --- | --- |
| `code` | Formal tour code. |
| `title` | Published title. |
| `days` | Number of days. |
| `detailUrl` | GoChina page for that tour. |
| `referencePrice` | `usd`, `eur`, and `label`. On a list item, `eur` is null. |
| `wholesalePrice` | Reserved. It is `null` until GoChina publishes a wholesale price. |

The list object also has `apiVersion` (`v1`) and `available` (`true`).

## Detail

```bash
curl "https://api.gochina.cool/v1/tours/P2026110001" \
  -H "Authorization: Bearer your_access_token"
```

The detail adds:

| Field | Meaning |
| --- | --- |
| `slug` | Public path segment. |
| `country` | Country, when the tour has one. |
| `travelers` | Reference group size. This is not remaining seats. |
| `coverUrl` | Cover image. |
| `highlights` | Published highlights. |
| `overview` | Published overview. |
| `itinerary` | Day-by-day content, with `imageUrls` when images are set. |
| `transport` | Published transport notes. |
| `detailContent` | Additional published detail. |
| `places` | Places linked from the itinerary. |
| `referencePrice.eur` | Euro reference amount, when one is published. |

There is no separate itinerary path. The day-by-day content is on this response.

`referencePrice.label` is `From USD 1200. Enquire for quote.` when a US dollar amount is present. When it is not, the label is `Enquire for quote.` The amount is a reference price, not a rate you can book.

`wholesalePrice` stays `null` until a wholesale price is published. A later value is an added field on `v1`.

## Limits

v1 has no category, tag, search, or page parameters. Drafts and codes that are not `P` plus 10 digits are absent.
