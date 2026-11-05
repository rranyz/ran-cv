# GitHub Actions Changelog

## 2026-11-05: Workflow modernization

### Files

| File | Change |
| --- | --- |
| `.github/workflows/nextjs.yml` | Rewritten in place (same path, so run history is kept). Renamed to "Deploy to GitHub Pages"; it now calls CI and deploys its artifact |
| `.github/workflows/ci.yml` | **New** reusable CI workflow (lint, type-check, build) |
| `.github/dependabot.yml` | **New**: weekly, grouped updates for GitHub Actions |
| `.nvmrc` | **New**: `22` (single Node version for local development and CI) |
| `CLAUDE.md` | Deployment section updated for the new workflows and Node version |
| `docs/github-actions-*.md` | **New**: audit, implementation and changelog docs |

### Actions upgraded

| Action | Before | After |
| --- | --- | --- |
| `actions/checkout` | `@v4` | `@3d3c42e5…` # v7.0.1 |
| `actions/setup-node` | `@v4` | `@949feb24…` # v7.1.0 |
| `actions/cache` | `@v3` | `@55cc8345…` # v6.1.0 |
| `actions/upload-pages-artifact` | `@v2` | `@fc324d35…` # v5.0.0 |
| `actions/deploy-pages` | `@v3` | `@368f8252…` # v5.0.1 |
| `actions/configure-pages` | `@v4` | **Removed** (see below) |

### Configuration changes
- Node.js 20 (EOL) → **22 LTS**, read from `.nvmrc`.
- Added explicit **lint** (`npm run lint`) and **type-check** (`tsc --noEmit`) steps. The build now uses the project script (`npm run build`).
- Added **CI for PRs** into `main`/`develop` and for pushes to `develop`.
- Deployment now depends on CI passing, through the reusable workflow.
- Permissions: the workflow baseline is `contents: read`, and `pages: write` and `id-token: write` are now granted to the `deploy` job only.
- `actions/checkout` uses `persist-credentials: false`.
- The `deploy` job runs only for `refs/heads/main`, so a manual dispatch from another branch can't deploy.
- Added `timeout-minutes`: 15 for build, 10 for deploy.
- CI concurrency cancels superseded PR and `develop` runs. The deploy concurrency (`pages`, no cancel) is unchanged.
- Next.js cache key narrowed to `package-lock.json` plus `src/**` and `next.config.js`. The path stays at `.next/cache`.
- Removed the "Detect package manager" step (the repo is npm-only).
- Removed `actions/configure-pages` with `static_site_generator: next`. It only injected `basePath: '/ran-cv'` and `images.unoptimized: true`, which `next.config.js` already sets, and deploy-pages doesn't need it.

### Breaking changes avoided
- The workflow file path `.github/workflows/nextjs.yml` was kept, so existing run history and any references stay valid.
- The `github-pages` environment name, the deployment URL output and the `pages` concurrency group are unchanged.
- The deployed output is unchanged: the same `./dist` static export with `basePath` `/ran-cv`, verified on a local Node 22 build.
- `upload-pages-artifact` v4+ excludes dotfiles. The export was confirmed to contain none.
- `actions/checkout` v7 blocks fork-PR checkout under `pull_request_target`/`workflow_run`. Neither event is used.
- No secrets, variables or environments were added or renamed.
- No dependencies were added, and `package.json` is untouched.

### Remaining manual configuration
1. Confirm Settings → Pages → Source = **GitHub Actions**.
2. Confirm the `github-pages` environment allows deployments from `main`.
3. Optional: require the **CI / Lint, type-check and build** status check on `main` and `develop`.
4. Locally, run `nvm use` to switch to Node 22.
5. Run `actionlint` once, or check annotations on the first GitHub run. It couldn't run in this session.
