---
title: Tour card
description: Show one published tour card with a Publishable Key.
sidebar:
  order: 1
---

`https://api.gochina.cool/embed.js` draws one card: cover, title, days, and the reference retail line. The card links to that tour’s GoChina page. It does not show the wholesale price, and it does not load the tour document.

`https://api.gochina.cool/v1/embed.js` is the same script. The script calls `GET /v1/tours/{tourCode}/card` with `X-Publishable-Key`.

## Parameters

| Name | In | Required | Description |
| --- | --- | --- | --- |
| `data-key` | attribute | yes | Publishable Key. |
| `data-tour` | attribute | yes | Formal tour code. |
| `data-target` | attribute | no | Id of the element that holds the card. If it is missing, the script inserts a card immediately before itself. |
| `data-currency` | attribute | no | One code from [Currencies](/manual/currencies/codes/). An unknown code is ignored. Do not send `USD`. |

## Example

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

The script then requests:

```bash
curl "https://api.gochina.cool/v1/tours/P2026110018/card?currency=GBP" \
  -H "X-Publishable-Key: pk_your_publishable_key"
```

```json
{
  "apiVersion": "v1",
  "available": true,
  "code": "P2026110018",
  "title": "Yunnan 15-Day Private Tour",
  "durationDays": 15,
  "websiteUrl": "https://gochina.cool/tours/yunnan-kunming-dali-lijiang-shangri-la-xishuangbanna-15-day-private-tour/",
  "coverImageUrl": "https://gochina.cool/media/yunnan-cover.jpg",
  "referenceRetailPrice": {
    "type": "amount",
    "amount": "1880.00",
    "currency": "USD",
    "displayLabel": "From USD 1880.00 per adult, for a party of 6. Enquire for quote."
  },
  "localizedDisplayLabel": "From GBP 1480.00 per adult, for a party of 6. Enquire for quote."
}
```

### Response fields

| Field | Type | Content |
| --- | --- | --- |
| `apiVersion` | string | Contract version. Always `v1`. |
| `available` | boolean | `true` when the card fields below are present. |
| `code` | string | Formal tour code. |
| `title` | string | Published title. |
| `durationDays` | integer \| null | Number of itinerary days, not nights. |
| `websiteUrl` | string | GoChina page opened by the card. |
| `coverImageUrl` | string \| null | Absolute URL of the list cover. |
| `referenceRetailPrice` | object | US dollar reference retail price. Same price object as [Prices](/manual/tours/prices/), including `type`, `amount`, `currency`, and `displayLabel`. `amount` stays in US dollars. There is no converted amount and no wholesale price. |
| `localizedDisplayLabel` | string \| null | `displayLabel` rewritten in the requested currency, using that currency’s minor units. `null` when `currency` is omitted. |

The script shows `localizedDisplayLabel` when it is present, and `displayLabel` otherwise.

The visitor sees the cover, the title, and a line such as `15 days · From GBP 1480.00 per adult, for a party of 6. Enquire for quote.` A click opens `websiteUrl` in a new tab. Any failure, including a network failure, replaces the card with `This tour is unavailable`.

## Errors

| Condition | HTTP | Body | Correction |
| --- | --- | --- | --- |
| Missing Publishable Key | 401 | `available` `false` | Set `data-key`. |
| The tour is not a published current-structure tour | 404 | `available` `false` | Use a code from [Tours](/manual/tours/read/). |
| More than 60 card requests per second for the application, or more than 10 from one visitor address | 429 | `available` `false` | Wait for `Retry-After`. List, detail, and price calls do not share this allowance. |

The card has no enquiry button. Use the JSON fields when you need a stable set of values. The script address can later change how the card looks.
