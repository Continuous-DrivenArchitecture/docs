---
title: Ecosystem architecture
description: How the CDA ecosystem is structured — repositories, contracts and the API truth rule.
---

## Repositories

Each CDA package lives in its own repository. The portal is a separate
repository too:

```text
Continuous-DrivenArchitecture/
├── archi-semantic-core/        # library: source, tests, examples, JSDoc
├── <future-library-a>/         # library: source, tests, examples, JSDoc
└── developer-portal/           # this site: Astro + Starlight + GitHub Pages
```

A library repository keeps everything needed to build and ship the package:
source, tests, examples, README, CHANGELOG, CONTRIBUTING. The portal keeps
everything needed to explain the ecosystem: conceptual documentation,
guides, per-library deep documentation, the API reference, and global
navigation and search.

## The API truth rule

> **Conceptual documentation may live in the portal; the truth of the API
> contract lives next to the code.**

Each library's JSDoc/TSDoc is the source of truth for its public API. The
portal generates every library's API reference from the **published npm
package** during CI:

```text
@cda/<library> published to npm
        │
        │ TypeDoc, against node_modules in the portal build
        ▼
src/content/docs/libraries/<library>/reference/generated/
```

Nothing is copied by hand. When a library releases a new version, the
portal bumps the pinned dependency and the reference follows.

## Releases

Every library follows the same pipeline:

1. Commits land on `develop` via pull requests.
2. `main` is updated only by semantic-release.
3. Releases are published to npm with OIDC provenance.
4. The portal's pinned dependency is bumped to the new version (currently a
   manual step; automation is planned).

## The portal build

The portal is a static site:

- **Framework**: Astro + Starlight (MDX, i18n-ready, local search).
- **Design**: the CDA design system (`src/styles/cda.css`).
- **Deploy**: GitHub Pages, built and deployed by the `docs.yml` workflow.
- **API reference**: generated at build time from the installed packages —
  never committed, always fresh.

## Boundaries

- The portal never forks or vendors library source code.
- A library's documentation lives in the portal as **conceptual content**
  only; API truth remains in the library's repository.
- Libraries never depend on the portal.
