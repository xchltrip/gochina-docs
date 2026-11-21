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
| App ID | Your application id, such as `10001`. |
| App Secret | Server only. Write it as `your_app_secret` in examples. |
| Publishable Key | Card only. Write it as `pk_your_publishable_key` in examples. |
| API base | `https://api.gochina.cool` |
| Docs | `https://docs.gochina.cool/` |
| Sample tour code | `P2026110001` |

That sample tour opens at `https://gochina.cool/tours/nujiang-canyon-meili-snow-mountain-6-day-tour/`.

A formal tour code is the letter `P` followed by 10 digits. The API returns only published tours whose code matches that shape. The application must be enabled.

## Two ways to show the tour

1. Embed: add `/v1/embed.js` to a page and pass the Publishable Key. See [Embed a card](/manual/embed/card/).
2. JSON: exchange the App Secret for a token, then call `/v1/tours/{code}` from your server. See [Authentication](/manual/authentication/token/) and [Read tours](/manual/tours/read/).

## Limits

The price is a reference price and includes the line “Enquire for quote.” The card does not take a booking.
