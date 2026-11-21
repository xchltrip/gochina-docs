---
title: Errors and limits
description: Failed tour calls return apiVersion and available false.
sidebar:
  order: 1
---

## What this page is for

A failed tour call does not describe the credential or the allow list. The JSON is only the version and `available`.

## When to use it

Use the HTTP status in your server logs. On a website card, show only the unavailable line.

## Response

| Situation | HTTP status |
| --- | --- |
| Missing or unknown credential | 401 |
| The application is disabled, or the allow list rejects the caller address | 403 |
| The tour code is not a published formal tour | 404 |
| The call is rate limited | 429 |

The body is:

```json
{
  "apiVersion": "v1",
  "available": false
}
```

The card shows `This tour is unavailable` for each of these cases.

## Limits

Calls are rate limited. This page does not publish a fixed number of calls per second. Handle `429` as unavailable and try again later.
