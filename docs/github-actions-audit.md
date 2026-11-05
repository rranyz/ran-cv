# GitHub Actions Audit

Audit date: 2026-11-05 · Repository: `rranyz/ran-cv` · Scope: `.github/workflows/`

## Project facts relevant to CI/CD

| Item | Value | Source |
| --- | --- | --- |
| Framework | Next.js 14.0.3 (App Router), React 18, TypeScript 5 | `package.json` |
| Next.js Node requirement | `>=18.17.0` | `node_modules/next/package.json` `engines` |
| Declared Node version | none (no `.nvmrc`, `.node-version` or `engines`) | repository root |
| Package manager | npm, `package-lock.json` lockfileVersion 3 (in sync, `npm ls` clean) | repository root |
| Output | static export: `output: 'export'`, `distDir: 'dist'`, `images.unoptimized: true`, `basePath: '/ran-cv'` when `NODE_ENV=production` | `next.config.js` |
| Scripts | `build`, `lint` (`next lint`, valid on Next 14), `dev`, `start`, `storybook`, `build-storybook` | `package.json` |
| Type-check script | none (`tsc --noEmit` works) | — |
| Tests | none | — |
| Secrets / variables used | none (only `GITHUB_TOKEN` and the Pages OIDC token) | workflow |
| Branch flow | `features/*` → `develop` → `main` via PRs | git history |

## Workflow inventory

| File | Name | Triggers | Jobs |
| --- | --- | --- | --- |
| `.github/workflows/nextjs.yml` | Deploy Next.js site to Pages | `push` to `main`, `workflow_dispatch` | `build` → `deploy` (environment `github-pages`) |

The file was the unmodified GitHub starter workflow for "Next.js → GitHub Pages".

## Current status: deployment is broken

The only recorded run ([#41930400500](https://github.com/rranyz/ran-cv/actions/runs/41930400500), push to `main`, 2026-11-04) failed in **Set up job** with:

> This request has been automatically failed because it uses a deprecated version of `actions/upload-artifact: v3`.

`actions/upload-pages-artifact@v2` uses `actions/upload-artifact@v3` internally, and GitHub now rejects that version. The site was not deployed.

## Deprecated / outdated actions

| Action | Used | Latest stable (verified 2026-11-05) | Problem |
| --- | --- | --- | --- |
| `actions/checkout` | `@v4` | `v7.0.1` | Three major versions behind |
| `actions/setup-node` | `@v4` | `v7.1.0` | Three major versions behind |
| `actions/cache` | `@v3` | `v6.1.0` | Three major versions behind; the legacy cache service and runtime are deprecated |
| `actions/configure-pages` | `@v4` | `v6.0.0` | Outdated; the `static_site_generator: next` mode duplicates config the repo already sets |
| `actions/upload-pages-artifact` | `@v2` | `v5.0.0` | **Fatal**: depends on the deprecated `upload-artifact@v3` |
| `actions/deploy-pages` | `@v3` | `v5.0.1` | Cannot consume artifacts from `upload-pages-artifact@v3+` (v4+ required) |

All actions were referenced by mutable major tags rather than commit SHAs.

## Problems identified

### Correctness / maintainability
- **Node 20 is end-of-life** (April 2026). Nothing in the repo declares a Node version, so local development (Node 18, also EOL) and CI could drift.
- **The "Detect package manager" step is dead code.** The project is npm-only, and the step adds three outputs and shell branching for no benefit.
- **The build bypasses project scripts.** It runs `npx --no-install next build` rather than `npm run build`.
- **`configure-pages` with `static_site_generator: next`** rewrites `next.config.js` at CI time to inject `basePath` and `images.unoptimized`. `next.config.js` already sets both to the same values, so this is redundant and makes the CI build differ from a local build.
- The Next.js cache path (`.next/cache`) is **correct**. In Next 14 with `output: 'export'`, the custom `distDir` receives only the exported site and the build directory is reset to `.next` (see `next/dist/build/index.js`). No change is needed beyond the key.

### Missing validation
- **There is no CI for pull requests or for `develop`.** Lint and type errors are first discovered when `main` deploys.
- Lint and type-check never run as explicit steps. `next build` runs them implicitly, so failures show up as build failures.

### Security
- `pages: write` and `id-token: write` were granted **workflow-wide**, so the build job, which runs third-party npm code, had Pages write and OIDC token access it doesn't need.
- `actions/checkout` persisted the `GITHUB_TOKEN` in `.git/config` (default `persist-credentials: true`) while `npm ci` ran arbitrary install scripts.
- Actions were pinned to mutable tags instead of immutable SHAs, and there was no automated update mechanism (no Dependabot).
- `workflow_dispatch` could be run from any branch, with no explicit guard on the deploy job. The `github-pages` environment's branch rule was the only protection.
- No `pull_request_target`, no secrets and no untrusted-input interpolation into `run:` scripts were found.

### Performance
- No concurrency control for validation runs (no validation workflow existed).
- No `timeout-minutes`: a hung job would hold a runner for the 6-hour default.
- The cache key hashed `**.[jt]s` across the whole repo, including Storybook stories and config, which invalidates the build cache more often than necessary.

### Platform notices
- `ubuntu-latest` is migrating to Ubuntu 26 from 2026-10-19 (runner annotation on the failed run). This is not a concern for a pure Node build.

## Recommended improvements

1. Upgrade every action to its latest major version, pinned by full commit SHA with a version comment.
2. Add a reusable `CI` workflow (lint, type-check, build) for PRs into `main`/`develop` and for pushes to `develop`.
3. Make the deploy workflow call CI and deploy only the artifact that CI built.
4. Pin Node 22 LTS via `.nvmrc` and use it in CI (`node-version-file`).
5. Apply least-privilege `permissions` (read-only baseline; Pages/OIDC write only in the deploy job), `persist-credentials: false`, and an explicit `main` guard on deploy.
6. Remove the dead package-manager detection and the redundant `configure-pages` step.
7. Add concurrency cancellation for superseded CI runs and `timeout-minutes` on every job.
8. Add Dependabot for the `github-actions` ecosystem to keep the SHA pins current.

### Out of scope (recommended separately)
- Upgrade Next.js 14.0.3 to the latest 14.2.x patch release for security fixes. The static export removes most server-side attack surface, but the toolchain is still outdated.
- The local working tree has CRLF line endings, while the git index is LF. This doesn't affect CI, but `npm run lint` fails locally with `Delete ␍` errors.
- Uncommitted `src/app/page.tsx` changes reference `/assets/img/profile-dev.jpg` and `/assets/img/globalnet_solutions_group_inc_logo.jpg` without the `/ran-cv` prefix. These images will 404 on GitHub Pages. This was confirmed in the exported `dist/index.html`.
