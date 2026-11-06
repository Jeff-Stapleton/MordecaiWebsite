# Project Mordecai promotional website

Initial promotional-site scaffold for Project Mordecai. The app uses React,
Vite, TypeScript, and React Router, with a web adaptation of the Tin Tally
design system.

## Local development

Requirements:

- Node.js 22+
- npm 10+

```bash
npm install
npm run dev
```

Vite prints the local URL after startup. The app defaults to the Diorama theme;
the header toggle switches to High Contrast and stores the choice locally.
Rowdies and Atkinson Hyperlegible are loaded from Google Fonts.

## Quality checks

```bash
npm run lint
npm run build
```

The production output is written to `dist/`.

## Routes

- `/` — promotional landing page
- `/systems/combat` — Combat
- `/systems/progression` — Character & Progression
- `/systems/items` — Loot & Gear
- `/systems/town` — Town & Preparation
- `/systems/world` — World & Exploration
- `/systems/enemies` — Enemies & Bosses

Nginx falls back to `index.html`, so direct requests to React Router routes work
in the production container.

## Fly.io deployment

The repository includes a multi-stage `Dockerfile`, an nginx configuration, and
`fly.toml`. The build stage compiles the Vite app; the runtime stage serves the
static output on port 8080.

No deployment is performed by this scaffold. To deploy from a workstation with
Fly.io credentials:

1. [Install `flyctl`](https://fly.io/docs/flyctl/install/).
2. Authenticate with `fly auth login`.
3. Choose a globally unique app name and create it:

   ```bash
   fly apps create <unique-app-name>
   ```

4. Replace the `app` value in `fly.toml` with that name. Adjust
   `primary_region` if `ord` is not the intended region.
5. Build and deploy:

   ```bash
   fly deploy
   ```

6. Check the static service with `fly status` and `fly open`.

To test the production image without Fly:

```bash
docker build -t mordecai-website .
docker run --rm -p 8080:8080 mordecai-website
```

Then open `http://localhost:8080`.

## Scope

This first pass is intentionally limited to routing, shared layout, responsive
page scaffolding, the Tin Tally token bridge, and Fly.io hosting configuration.
It does not include a CMS, blog, authentication, analytics, or a production
deployment. Promotional CTA destinations are visibly marked as examples until
official store and community URLs exist.
