---
title: Read tours
description: List published tours or read one tour, including its day-by-day content.
sidebar:
  order: 1
---

## What this page is for

`GET /v1/tours` lists published tours that use the current itinerary structure. `GET /v1/tours/{tourCode}` returns one tour. Prices are not on these responses. Read them from [Reference prices](/manual/tours/prices/).

## When to use it

Use the list to discover codes. Use the detail when you render one tour yourself. The website card is a separate, smaller view. See [Embed a card](/manual/embed/card/).

Both calls require `Authorization: Bearer`. A Publishable Key is rejected.

## List

```bash
curl "https://api.gochina.cool/v1/tours?page=1&pageSize=20" \
  -H "Authorization: Bearer your_access_token"
```

`page` starts at 1. `pageSize` defaults to 20 and cannot exceed 100. Tours are ordered by `code`. A page past the end returns HTTP 200, an empty `tours` array, and the same `totalCount`.

| Field | Meaning |
| --- | --- |
| `code` | Formal tour code. |
| `title` | Published title. |
| `subtitle` | Plain-text subtitle. `null` when the tour has none. |
| `durationDays` | Number of itinerary days, not nights. |
| `coverImageUrl` | List cover. It is not the first gallery image. |
| `websiteUrl` | GoChina page for that tour. |
| `updatedAt` | Content modification time, `2026-11-21T16:04:00Z`. A price edit can move this time, so do not use it as a price version. |

The list object also has `apiVersion`, `page`, `pageSize`, and `totalCount`. An invalid `page` returns HTTP 400 and `error` `invalid_page`. An invalid `pageSize` returns `invalid_page_size`. Any other query parameter returns `invalid_parameter`.

## Detail

```bash
curl "https://api.gochina.cool/v1/tours/P2026110018" \
  -H "Authorization: Bearer your_access_token"
```

The detail adds the itinerary, linked places, gallery, services, and policies. It has no price fields. Send the previous `ETag` as `If-None-Match`. An unchanged tour returns HTTP 304. The `ETag` value is opaque.

| Field | Meaning |
| --- | --- |
| `country` | Country name, or `null`. |
| `categoryNames`, `tagNames` | Display names. Empty arrays when none are published. |
| `galleryImageUrls` | Album URLs in editor order. |
| `video` | `url` and `posterUrl`, or `null`. |
| `referenceGroupSize` | Party size the reference price assumes. Not remaining seats. |
| `highlightGroups` | `team_service`, `transportation`, `sightseeing`, `accommodation`, `meals`. Each item has plain-text `title` and `detail`. An empty array means the structured summary is not published yet. |
| `itinerary` | Days in order. `dayNumber` starts at 1. `summaryHtml` is the day text. |
| `itinerary[].meals` | `breakfast`, `lunch`, and `dinner`. Each has `status` and plain-text `note`. Status is `included`, `own_expense`, `hotel_policy`, `unknown`, or `not_applicable`. |
| `itinerary[].accommodation` | That night. `status` is `arranged`, `none`, or `unknown`. |
| `itinerary[].activities` | Visits in editor order. `activityType` is `attraction`, `activity`, `transfer`, or `free_time`. |
| `activities[].placeKey` | Public place key. `null` when the visit has no published place. |
| `activities[].visitNote` | Note for this visit, not the shared place text. |
| `activities[].admission` | `not_required`, `included`, `excluded`, `unknown`, or `null`. |
| `activities[].participation` | `scheduled` or `optional`. |
| `activities[].alternative` | `true` marks an alternative. It does not change the price. |
| `places` | One object per `placeKey`, in the order each place first appears. `bodyHtml` is the shared description. `imageUrls` are absolute. Archived places are omitted. |
| `transportSegments` | Flights and trains. `transportType` is `flight`, `rail`, `private_vehicle`, `ground`, or `scenic_transfer`. `departDayNumber` points at a day. `serviceNumber` is the flight or train number. |
| `services` | Tour-level service groups. `kind` is `accommodation`, `transportation`, `guide`, `transfers`, or `other`. This accommodation text is not the same as one night in the itinerary. |
| `policies` | `inclusions`, `exclusions`, `travel_notes`, or `other`. Each item has `html`. |

`summaryHtml`, `bodyHtml`, and policy `html` may contain `p`, `br`, `strong`, `em`, `ul`, `ol`, `li`, and `a`. Links are `http` or `https`. Render them as HTML.

A code that is not a published current-structure tour returns HTTP 404 and `available` `false`, after the token is checked. An unknown query parameter returns HTTP 400 and `error` `invalid_parameter`. There is no `lang` or `date` parameter.

## Limits

The detail can be cached by your server as a private response. Prices cannot. Call the list again to see new `updatedAt` values. There is no push notification.
