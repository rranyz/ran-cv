# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio / CV site for Rannie Raymundo, built with Next.js 14 (App Router), React 18 and TypeScript. It is deployed as a fully static export to GitHub Pages under the `/ran-cv` base path.

## Commands

Package manager: **npm** (`package-lock.json`; no yarn/pnpm lockfile). Node version: **22**, from `.nvmrc` (run `nvm use`); CI reads the same file.

- `npm run dev` – dev server (http://localhost:3000, served without the `/ran-cv` base path)
- `npm run build` – production static export into `dist/` (not `.next/` or `out/`)
- `npm run lint` – `next lint` (ESLint 8 with a legacy `.eslintrc.json`)
- `npx tsc --noEmit` – type-check (there is no dedicated script)
- `npm run storybook` – Storybook 7 on port 6006; `npm run build-storybook` for a static build

There is no test runner or test suite. `@storybook/test` is installed, but no tests are written yet.

## Architecture

- `src/app/` – App Router. `layout.tsx` sets global metadata and the Inter font. `page.tsx` is one large `'use client'` page that holds almost all site content (hero, info, experience timeline, projects, socials) inline as JSX and data. `about/page.tsx` is a stub.
- `src/components/<Name>/<Name>.tsx` – components, optionally with a `<Name>.module.css` and `<Name>.stories.ts` beside them. `Chrono` wraps `react-chrono` and is loaded with `next/dynamic` and `ssr: false` because it is browser-only.
- `src/stories/` – Storybook's default example stories (scaffolding, not site code). Storybook picks up `src/**/*.stories.*` and serves `public/` as static files.
- Path alias: `@/*` → `./src/*`.
- Global styles are in `src/app/globals.css`. Component styles use CSS Modules.

## Static export and base path (important)

`next.config.js` sets `output: 'export'`, `distDir: 'dist'`, `images.unoptimized: true`, and `basePath: '/ran-cv'` **only when `NODE_ENV === 'production'`**.

- `next/image` with a string `src` does **not** add `basePath` automatically. Images under `public/` must therefore be written as `/ran-cv/assets/img/...` (as the existing hero image is), or they will 404 on GitHub Pages. That same prefixed path does not resolve in `npm run dev`, which has no base path.
- No server features are available: no API routes, no runtime SSR, and no `next/image` optimization.

## Deployment

- `.github/workflows/ci.yml` ("CI") runs `npm ci`, `npm run lint`, `tsc --noEmit` and `npm run build` on PRs into `main`/`develop` and on pushes to `develop`. It is also a reusable workflow (`workflow_call`) with an `upload-pages-artifact` input.
- `.github/workflows/nextjs.yml` ("Deploy to GitHub Pages") runs on push to `main` (or by manual dispatch). It calls `ci.yml` with `upload-pages-artifact: true`, then deploys `./dist` to the `github-pages` environment, on `main` only. The base path is configured only in `next.config.js`; CI does not rewrite it.
- All actions are pinned to commit SHAs with a `# vX.Y.Z` comment. Dependabot (`.github/dependabot.yml`) updates them. Keep both the SHA and the comment when editing by hand.
- Design and rationale: `docs/github-actions-*.md`.

Branch flow: `features/*` → `develop` → `main`, through PRs. Only `main` deploys.

## Code style

- Prettier (`.prettierrc`): single quotes, no semicolons, no trailing commas, 2-space indent. ESLint enforces it through `prettier/prettier: error`.
- ESLint extends `next/core-web-vitals`, `airbnb`, `@typescript-eslint/recommended` and `prettier`. Components must be arrow functions, function expressions or function declarations (`react/function-component-definition`). JSX is only allowed in `.jsx`/`.tsx` files.
- `.gitattributes` enforces LF line endings (`* text=auto eol=lf`). Files are LF in the git index, but a checkout made before `.gitattributes` existed can leave CRLF in the working tree, and `prettier/prettier` then reports every line as `Delete ␍`. Keep files LF.
