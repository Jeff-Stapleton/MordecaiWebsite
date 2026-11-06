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

## Playtest download

The landing-page hero links to the public Windows playtest package:
[download the latest build](https://mordecai-game-builds.t3.tigrisfiles.io/playtest/ProjectMordecai-Windows-latest.zip).
This stable URL is intended to keep pointing to the current playtest build.

## Fly.io deployment

The repository includes a multi-stage `Dockerfile`, an nginx configuration, and
`fly.toml`. The build stage compiles the Vite app; the runtime stage serves the
static output on port 8080.

Production is available at
[https://mordecai-website.fly.dev/](https://mordecai-website.fly.dev/).

### Automatic deployment

The `Deploy to Fly.io` GitHub Actions workflow deploys every push to `main` and
can also be started manually with `workflow_dispatch`.

Create an app-scoped deploy token:

```bash
fly tokens create deploy -a mordecai-website
```

Store its value as the repository Actions secret `FLY_API_TOKEN`. Never commit
the token. The workflow deploys with the legacy remote builder because Depot
timed out for this app:

```bash
flyctl deploy --remote-only --depot=false -a mordecai-website
```

The `--depot=false` flag is required for both automated and manual deployments.

### Manual deployment

To deploy from a workstation with Fly.io credentials:

1. [Install `flyctl`](https://fly.io/docs/flyctl/install/).
2. Authenticate with `fly auth login`.
3. Run:

   ```bash
   flyctl deploy --remote-only --depot=false -a mordecai-website
   ```

4. Check the static service with `fly status -a mordecai-website` or open the
   [live site](https://mordecai-website.fly.dev/).

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
storefront release. The public Windows download is an in-development playtest;
future store and community links are not yet included.
