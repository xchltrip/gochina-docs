---
title: Start here
description: Use a private credential to show one published GoChina tour.
sidebar:
  order: 1
---

## What this page is for

GoChina sends the credential to you. This site does not offer an application form, and it never displays a real secret.

## When to use it

Use it when you are ready to show one published tour on your own website. Start with the website card. Use the JSON API when you have your own server and want to render the tour yourself.

## What you receive

| Field | Meaning |
| --- | --- |
| App ID | Your application id, such as `10001`. Send it as a string. |
| App Secret | Server only. Write it as `your_app_secret` in examples. |
| Publishable Key | Card only. Write it as `pk_your_publishable_key` in examples. |
| API base | `https://api.gochina.cool` |
| Docs | `https://docs.gochina.cool/` |
| Sample tour code | `P2026110018` |

A formal tour code is the letter `P` followed by 10 digits. The API returns only published tours that use the current itinerary structure. Older tours are absent. The application must be enabled, and the server address must be registered before the first call.

## Two ways to show the tour

1. Embed: add `https://api.gochina.cool/embed.js` to a page and pass the Publishable Key. See [Embed a card](/manual/embed/card/).
2. JSON: exchange the App Secret for a token, then call the tour and price paths from your server. See [Authentication](/manual/authentication/token/), [Read tours](/manual/tours/read/), and [Reference prices](/manual/tours/prices/).

Short answers to the first integration questions are on [Q&A](/manual/qa/questions/).

## Limits

The price is a reference price per adult for the published party size. It includes the line “Enquire for quote.” Children’s prices are not in the response. The card does not take a booking. v1 has no language parameter and no departure date.
