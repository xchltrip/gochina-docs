# GoChina Open Platform docs

Source for the customer handbook at <https://docs.gochina.cool>. Pages are English. The machine-readable contract is [`public/openapi/v1.yaml`](public/openapi/v1.yaml), published at <https://docs.gochina.cool/openapi/v1.yaml>.

## Pages

The sidebar is set in `astro.config.mjs`. Only the API section is a group.

| Sidebar | Source |
| --- | --- |
| Overview | `src/content/docs/manual/getting-started/start.md` |
| API / Authentication | `src/content/docs/manual/authentication/token.md` |
| API / Tours | `src/content/docs/manual/tours/read.md` |
| API / Prices | `src/content/docs/manual/tours/prices.md` |
| API / Currencies | `src/content/docs/manual/currencies/codes.md` |
| API / Tour card | `src/content/docs/manual/embed/card.md` |
| Q&A | `src/content/docs/manual/qa/questions.md` |
| Versions | `src/content/docs/manual/versions/v1.md` |

An API page starts with what the call does, then a parameter table (name, location, required, description). The example request and example response use the same parameters. A response-field table follows, with name, type, and meaning. Nested objects get their own table. A second short example covers the other shape. The error table lists the condition, HTTP status, `error` value, and what to change.

## Layout

```text
src/content/docs/manual/   handbook pages
public/openapi/v1.yaml     OpenAPI contract
public/images/manual/      images used by the handbook
src/styles/brand.css       logo spacing and wide-screen layout
astro.config.mjs           site title, sidebar, redirects
scripts/check-content.mjs  filename, title, and image checks
```

## Local development

Node.js 22 or newer.

```bash
npm install
npm run dev
```

The dev server prints a local URL. `npm run check:content` checks pages without building. `npm run build` writes the static site to `dist/`. `npm run preview` serves that build.

## Writing a page

- File names are lowercase, with hyphens: `prices.md`, not `Prices.md`.
- Every page has a `title` in the frontmatter.
- Handbook images live in `public/images/manual/` and are referenced as `/images/manual/...`. Each image needs alt text and must be under 1 MB.
- Keep JSON field names, paths, and headers exactly as the API returns them.
- Do not put secrets, internal hostnames, or unpublished behavior in a page.

`npm run check:content` enforces the filename, title, and image rules. The deploy workflow runs it before the build.

## Publish

A push to `main` runs `.github/workflows/deploy.yml`. That workflow installs dependencies, runs the content check, builds the site, and publishes <https://docs.gochina.cool>. The same workflow can be started by hand from GitHub Actions.
