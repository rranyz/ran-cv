# GitHub Actions Implementation

## Architecture

```
pull_request → main/develop ─┐
push → develop ──────────────┼──► CI (ci.yml) ── verify: lint · type-check · build
                             │
push → main ─────────────────┘
workflow_dispatch ──► Deploy to GitHub Pages (nextjs.yml)
                        ├─ build  = uses ci.yml (upload-pages-artifact: true)
                        └─ deploy = needs build, main only → github-pages environment
```

The build and checks are defined once, in `ci.yml`. The deploy workflow calls it as a reusable workflow, so production deploys run exactly the checks that pull requests run. The deployed files are the artifact produced by that run, with no second install or build.

## Workflows

### `CI` (`.github/workflows/ci.yml`)

| | |
| --- | --- |
| Responsibility | Validate that the site lints, type-checks and builds as a static export |
| Triggers | `pull_request` targeting `main` or `develop`; `push` to `develop`; `workflow_call` |
| Inputs (`workflow_call`) | `upload-pages-artifact` (boolean, default `false`): upload `./dist` as the Pages artifact |
| Permissions | `contents: read` |
| Concurrency | group `ci-<workflow>-<ref>`. Superseded runs are cancelled, except on `refs/heads/main` (deploys are never cancelled) |
| Job | `verify` ("Lint, type-check and build"), `ubuntu-latest`, 15-minute timeout |

Steps:
1. Checkout (`persist-credentials: false`).
2. Set up Node.js from `.nvmrc` (22), with npm download caching keyed on `package-lock.json`.
3. Restore the Next.js build cache (`.next/cache`), keyed on the lockfile plus `src/**` and `next.config.js`.
4. `npm ci`.
5. `npm run lint`.
6. `npx --no-install tsc --noEmit`.
7. `npm run build`, which writes the static export to `dist/` with `basePath` `/ran-cv`.
8. Upload `./dist` with `actions/upload-pages-artifact` (only when called with `upload-pages-artifact: true`).

Pull requests from forks use the `pull_request` event, so they get a read-only token and no secrets. `pull_request_target` is not used.

### `Deploy to GitHub Pages` (`.github/workflows/nextjs.yml`)

| | |
| --- | --- |
| Responsibility | Publish the static export to GitHub Pages |
| Triggers | `push` to `main`; `workflow_dispatch` |
| Workflow permissions | `contents: read` |
| Concurrency | group `pages`, `cancel-in-progress: false` (unchanged): one deployment at a time, in-progress deployments are never cancelled |

| Job | Depends on | Condition | Permissions | Notes |
| --- | --- | --- | --- | --- |
| `build` | — | — | `contents: read` | `uses: ./.github/workflows/ci.yml` with `upload-pages-artifact: true` |
| `deploy` | `build` | `github.ref == 'refs/heads/main'` | `pages: write`, `id-token: write` | Environment `github-pages`, URL from `actions/deploy-pages` output, 10-minute timeout |

A failure in lint, type-check or build stops `build`, so `deploy` never runs. A manual `workflow_dispatch` from a non-`main` branch runs CI but skips deployment.

### Dependabot (`.github/dependabot.yml`)

Weekly check for the `github-actions` ecosystem. All action updates are grouped into one PR with a `ci` commit prefix, and Dependabot updates both the SHA and the version comment. npm dependencies are not managed.

## Pinned action versions

| Action | Version | Commit SHA |
| --- | --- | --- |
| `actions/checkout` | v7.0.1 | `3d3c42e5aac5ba805825da76410c181273ba90b1` |
| `actions/setup-node` | v7.1.0 | `949feb2413d6458794dcd2491c4babbbce0c15c1` |
| `actions/cache` | v6.1.0 | `55cc8345863c7cc4c66a329aec7e433d2d1c52a9` |
| `actions/upload-pages-artifact` | v5.0.0 | `fc324d3547104276b827a68afc52ff2a11cc49c9` |
| `actions/deploy-pages` | v5.0.1 | `368f82528645a54fb793d4d04e342629a3f51346` |

All of them run on the `node24` Actions runtime (`upload-pages-artifact` is a composite action that wraps `upload-artifact` v7).

## Required GitHub Secrets and Variables

**None.** The workflows only use the automatic `GITHUB_TOKEN` and the GitHub Pages OIDC token. No secrets or variables were present before, and none were added.

## Required repository configuration (manual, on GitHub)

| Setting | Required value | Why |
| --- | --- | --- |
| Settings → Pages → Build and deployment → Source | **GitHub Actions** | `deploy-pages` fails otherwise. This couldn't be checked: the Pages API requires authentication |
| Settings → Environments → `github-pages` → Deployment branches | Allow `main` (GitHub's default for this environment) | The deploy job targets this environment |
| Settings → Actions → General → Workflow permissions | "Read repository contents" is sufficient | Workflows request any elevated permissions explicitly |
| Branch protection for `main` / `develop` (optional, recommended) | Require the status check **CI / Lint, type-check and build** | Blocks merging PRs that fail CI |

## Validation results (2026-11-05)

| Check | Result | Method |
| --- | --- | --- |
| YAML syntax (`ci.yml`, `nextjs.yml`, `dependabot.yml`) | ✅ Pass | PyYAML `safe_load` |
| Workflow structure | ✅ Pass | Scripted checks: reusable workflow path, declared vs passed inputs, `needs`, per-job permissions, timeouts |
| SHA pins | ✅ Pass | Every SHA matches its tag in `git ls-remote`; every `uses:` is SHA-pinned with a `# vX.Y.Z` comment |
| `actionlint` | ⚠️ Not run | Downloading and running the binary was not permitted in this session. Run `actionlint` locally or check the workflow annotations on the first GitHub run |
| Node.js compatibility | ✅ Pass | Full CI steps run on Node 22.20.0 against a clean `git archive HEAD` export (LF files, like a CI checkout) |
| `npm ci` | ✅ Pass | Lockfile in sync; 1429 packages installed |
| `npm run lint` | ✅ Pass | "No ESLint warnings or errors" |
| `tsc --noEmit` | ✅ Pass | No errors |
| `npm run build` | ✅ Pass | 3 static routes; `dist/index.html` present; assets prefixed `/ran-cv/_next/...`; no dotfiles in `dist/` (they would be dropped by `upload-pages-artifact` v4+) |
| Uncommitted `feature/content-update` changes | ✅ CI passes | Lint, type-check and build pass. Two images lack the `/ran-cv` prefix (see the audit) |
| Tests | n/a | The project has no test suite |
| Pages deployment, OIDC, environment rules | ⏳ Pending | Can only be validated by the first run on GitHub after merging to `main` |

### Still to validate on GitHub
1. The first PR into `develop`/`main` should trigger **CI** and pass.
2. The first push to `main` should run **Deploy to GitHub Pages**: `build` (CI and artifact upload) then `deploy`, ending with a page URL.
3. The site should load at `https://rranyz.github.io/ran-cv/`, with CSS, JS and images resolving.
4. A second push should hit the npm and `.next/cache` caches (shown in the "Set up Node.js" and "Restore Next.js build cache" step logs).
