---
title: Tours
description: List published tours or read one tour, including its day-by-day content.
sidebar:
  order: 1
---

`GET /v1/tours` lists published tours that use the current itinerary structure. `GET /v1/tours/{tourCode}` returns one tour, including its days and linked places. Neither response contains a price. Read prices from [Prices](/manual/tours/prices/).

Both calls require `Authorization: Bearer`. A Publishable Key is rejected. The website card is a smaller view. See [Tour card](/manual/embed/card/).

## List

### Parameters

| Name | In | Required | Description |
| --- | --- | --- | --- |
| `Authorization` | header | yes | Bearer token. A Publishable Key returns HTTP 401. |
| `page` | query | no | Integer. Starts at 1. Default is 1. |
| `pageSize` | query | no | Integer from 1 to 100. Default is 20. |

Tours are ordered by `code`. A `page` past the end returns HTTP 200, an empty `tours` array, and the same `totalCount`.

### Example request

```bash
curl "https://api.gochina.cool/v1/tours?page=1&pageSize=20" \
  -H "Authorization: Bearer your_access_token"
```

### Example response

```json
{
  "apiVersion": "v1",
  "page": 1,
  "pageSize": 20,
  "totalCount": 1,
  "tours": [
    {
      "code": "P2026110018",
      "title": "Yunnan 15-Day Private Tour",
      "subtitle": null,
      "durationDays": 15,
      "coverImageUrl": "https://gochina.cool/media/yunnan-cover.jpg",
      "websiteUrl": "https://gochina.cool/tours/yunnan-kunming-dali-lijiang-shangri-la-xishuangbanna-15-day-private-tour/",
      "updatedAt": "2026-11-21T16:04:00Z"
    }
  ]
}
```

### Response fields

| Field | Type | Content |
| --- | --- | --- |
| `apiVersion` | string | Contract version. Always `v1`. |
| `page` | integer | The page you requested. Starts at 1. |
| `pageSize` | integer | The page size used for this response. |
| `totalCount` | integer | Number of published tours in the current structure. Not a price. |
| `tours` | array of object | One object per tour on this page. Empty when `page` is past the end. |
| `tours[].code` | string | Formal tour code, `P` plus 10 digits. |
| `tours[].title` | string | Published title. |
| `tours[].subtitle` | string \| null | Plain-text subtitle. `null` when the tour has none. |
| `tours[].durationDays` | integer \| null | Number of itinerary days, not nights. |
| `tours[].coverImageUrl` | string \| null | Absolute URL of the list cover. It is not the first gallery image. |
| `tours[].websiteUrl` | string | GoChina page for that tour. |
| `tours[].updatedAt` | string | Content modification time, `2026-11-21T16:04:00Z`. A price edit can move it, so do not use it as a price version. |

## Detail

### Parameters

| Name | In | Required | Description |
| --- | --- | --- | --- |
| `Authorization` | header | yes | Bearer token. A Publishable Key returns HTTP 401. |
| `tourCode` | path | yes | Formal tour code. |
| `If-None-Match` | header | no | Previous `ETag`, sent unchanged. The value is opaque. |

An unchanged tour returns HTTP 304. The detail can be cached by your server as a private response. Prices cannot.

### Example request

```bash
curl "https://api.gochina.cool/v1/tours/P2026110018" \
  -H "Authorization: Bearer your_access_token"
```

### Example response

The document below is one day of a longer tour, with the linked place, one transport segment, one service, and one policy. A published tour repeats `itinerary` for every day. There is no price field.

```json
{
  "apiVersion": "v1",
  "available": true,
  "code": "P2026110018",
  "title": "Yunnan 15-Day Private Tour",
  "subtitle": null,
  "durationDays": 15,
  "country": "China",
  "websiteUrl": "https://gochina.cool/tours/yunnan-kunming-dali-lijiang-shangri-la-xishuangbanna-15-day-private-tour/",
  "coverImageUrl": "https://gochina.cool/media/yunnan-cover.jpg",
  "updatedAt": "2026-11-21T16:04:00Z",
  "categoryNames": ["Private tour"],
  "tagNames": ["Yunnan"],
  "galleryImageUrls": ["https://gochina.cool/media/yunnan-gallery-1.jpg"],
  "video": null,
  "referenceGroupSize": 6,
  "highlightGroups": [
    {
      "group": "sightseeing",
      "items": [{ "title": "Old Town of Lijiang", "detail": null }]
    }
  ],
  "itinerary": [
    {
      "dayNumber": 1,
      "title": "Arrive in Kunming",
      "summaryHtml": "<p>Arrive in Kunming.</p>",
      "meals": {
        "breakfast": { "status": "not_applicable", "note": null },
        "lunch": { "status": "own_expense", "note": null },
        "dinner": { "status": "included", "note": null }
      },
      "accommodation": { "status": "arranged", "note": "Kunming" },
      "activities": [
        {
          "activityType": "attraction",
          "placeKey": "green-lake",
          "title": "Green Lake",
          "visitNote": null,
          "admission": "included",
          "participation": "scheduled",
          "alternative": false
        }
      ]
    }
  ],
  "places": [
    {
      "placeKey": "green-lake",
      "name": "Green Lake",
      "localName": "Cuihu",
      "placeType": "park",
      "city": "Kunming",
      "region": "Yunnan",
      "address": null,
      "tagNames": [],
      "imageUrls": [],
      "bodyHtml": "<p>A lake park in Kunming.</p>"
    }
  ],
  "transportSegments": [
    {
      "transportType": "flight",
      "origin": "Kunming",
      "destination": "Lijiang",
      "departDayNumber": 2,
      "departTime": "09:00",
      "arriveDayNumber": 2,
      "arriveTime": "10:05",
      "serviceNumber": "MU5814"
    }
  ],
  "services": [
    {
      "kind": "guide",
      "title": "Guide",
      "items": [{ "html": "<p>English-speaking guide.</p>" }]
    }
  ],
  "policies": [
    {
      "kind": "inclusions",
      "title": "Inclusions",
      "items": [{ "html": "<p>Hotels and private transfers.</p>" }]
    }
  ]
}
```

### Response fields

The list fields `code`, `title`, `subtitle`, `durationDays`, `coverImageUrl`, `websiteUrl`, and `updatedAt` have the same type and meaning here. The detail adds the fields below. There is no price field.

| Field | Type | Content |
| --- | --- | --- |
| `apiVersion` | string | Contract version. Always `v1`. |
| `available` | boolean | `true` when this tour is returned. |
| `country` | string \| null | Country name. |
| `categoryNames` | array of string | Display names. Empty when none are published. |
| `tagNames` | array of string | Display names. Empty when none are published. |
| `galleryImageUrls` | array of string | Absolute album URLs, in editor order. |
| `video` | object \| null | `null` when the tour has no video. |
| `video.url` | string | Absolute video URL. Present only when `video` is an object. |
| `video.posterUrl` | string \| null | Absolute poster image URL. |
| `referenceGroupSize` | integer \| null | Party size the reference price assumes. Not remaining seats. |
| `highlightGroups` | array of object | Structured summary groups. Empty when that summary is not published yet. |
| `itinerary` | array of object | Days in order. `dayNumber` starts at 1. |
| `places` | array of object | One object per place, in the order each place first appears. Archived places are omitted. |
| `transportSegments` | array of object | Flights, trains, and other legs. |
| `services` | array of object | Tour-level service groups. |
| `policies` | array of object | Inclusions, exclusions, and notes. |

#### `highlightGroups[]`

| Field | Type | Content |
| --- | --- | --- |
| `group` | string | `team_service`, `transportation`, `sightseeing`, `accommodation`, or `meals`. |
| `items` | array of object | Lines in that group. |
| `items[].title` | string | Plain-text title. |
| `items[].detail` | string \| null | Plain-text detail. |

#### `itinerary[]`

| Field | Type | Content |
| --- | --- | --- |
| `dayNumber` | integer | Day number, starting at 1. |
| `title` | string \| null | Day title. |
| `summaryHtml` | string \| null | Day text. Render as HTML. |
| `meals` | object | `breakfast`, `lunch`, and `dinner`. Each is a meal object. |
| `accommodation` | object | That night. This is not the tour-level accommodation text in `services`. |
| `activities` | array of object | Visits in editor order. |

#### Meal object

Used for `meals.breakfast`, `meals.lunch`, and `meals.dinner`.

| Field | Type | Content |
| --- | --- | --- |
| `status` | string | `included`, `own_expense`, `hotel_policy`, `unknown`, or `not_applicable`. |
| `note` | string \| null | Plain-text note. |

#### `itinerary[].accommodation`

| Field | Type | Content |
| --- | --- | --- |
| `status` | string | `arranged`, `none`, or `unknown`. |
| `note` | string \| null | Plain-text note, such as the city. |

#### `itinerary[].activities[]`

| Field | Type | Content |
| --- | --- | --- |
| `activityType` | string | `attraction`, `activity`, `transfer`, or `free_time`. |
| `placeKey` | string \| null | Public place key. `null` when the visit has no published place. Matches `places[].placeKey`. |
| `title` | string \| null | Title of this visit. |
| `visitNote` | string \| null | Note for this visit, not the shared place text. |
| `admission` | string \| null | `not_required`, `included`, `excluded`, or `unknown`. |
| `participation` | string | `scheduled` or `optional`. |
| `alternative` | boolean | `true` marks an alternative. It does not change the price. |

#### `places[]`

| Field | Type | Content |
| --- | --- | --- |
| `placeKey` | string | Public place key. |
| `name` | string \| null | Place name. |
| `localName` | string \| null | Local place name. |
| `placeType` | string \| null | Place type, such as `park`. |
| `city` | string \| null | City. |
| `region` | string \| null | Region. |
| `address` | string \| null | Address. |
| `tagNames` | array of string | Display names. Empty when none are published. |
| `imageUrls` | array of string | Absolute image URLs. |
| `bodyHtml` | string \| null | Shared place description. Render as HTML. |

#### `transportSegments[]`

| Field | Type | Content |
| --- | --- | --- |
| `transportType` | string | `flight`, `rail`, `private_vehicle`, `ground`, or `scenic_transfer`. |
| `origin` | string \| null | Departure place name. |
| `destination` | string \| null | Arrival place name. |
| `departDayNumber` | integer \| null | Itinerary day the leg departs. |
| `departTime` | string \| null | Departure time, such as `09:00`. |
| `arriveDayNumber` | integer \| null | Itinerary day the leg arrives. |
| `arriveTime` | string \| null | Arrival time, such as `10:05`. |
| `serviceNumber` | string \| null | Flight or train number. |

#### `services[]` and `policies[]`

| Field | Type | Content |
| --- | --- | --- |
| `kind` | string | Services: `accommodation`, `transportation`, `guide`, `transfers`, or `other`. Policies: `inclusions`, `exclusions`, `travel_notes`, or `other`. |
| `title` | string \| null | Group title. |
| `items` | array of object | One object per line. |
| `items[].html` | string | Line text. Render as HTML. |

`summaryHtml`, `bodyHtml`, and `items[].html` may contain `p`, `br`, `strong`, `em`, `ul`, `ol`, `li`, and `a`. Links are `http` or `https`.

## Errors

| Condition | HTTP | Body | Correction |
| --- | --- | --- | --- |
| Unknown query parameter, including `lang` or `date` | 400 | `error` `invalid_parameter` | Remove it. |
| `page` is not an integer of 1 or more | 400 | `error` `invalid_page` | Send `page=1` or omit it. |
| `pageSize` is outside 1 to 100 | 400 | `error` `invalid_page_size` | Send a value from 1 to 100, or omit it. |
| The code is not a published current-structure tour | 404 | `available` `false` | The token is checked first. A missing credential is HTTP 401, not 404. |

There is no push notification. Call the list again to see a new `updatedAt`.
