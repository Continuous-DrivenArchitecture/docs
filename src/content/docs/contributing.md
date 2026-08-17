---
title: Contributing
description: How to contribute to the CDA ecosystem and the developer portal.
---

Contributions are welcome across the whole ecosystem.

## Where to contribute

- **A library** (e.g. `archi-semantic-core`): bug reports with minimal
  `.archimate` repros, fixtures, JSDoc improvements, tests. Follow that
  repository's own CONTRIBUTING file — each library documents its
  conventions, branch flow and release pipeline.
- **This portal**: documentation, guides, tutorials, fixes to the design
  system. Content lives in `src/content/docs/`; the API reference is
  generated and never hand-edited.
- **Design**: the CDA design system (`src/styles/cda.css`) and branding.

## The rules that matter everywhere

1. **Faithfulness first.** Never "fix" documentation to make the library
   look better than it is — document boundaries honestly.
2. **The API truth lives with the code.** If the API changed, the fix
   belongs in the library's JSDoc, not in portal copy.
3. **Conventional Commits.** Libraries release automatically; commit
   messages become changelogs.

## Working on the portal

```sh
git clone https://github.com/Continuous-DrivenArchitecture/developer-portal
cd developer-portal
npm ci
npm run dev
```

- `npm run gen:api` regenerates the API reference from the installed
  packages (pin the version in `package.json`).
- `npm run build` validates the full static build, including the search
  index.
- The site deploys from `main`; propose changes via pull requests.

## Writing docs

New pages go in `src/content/docs/` with a short frontmatter (`title`,
`description`). The sidebar in `astro.config.mjs` lists every page
explicitly — add yours there too.

Do not duplicate: if the portal already explains a concept (for example
native-format faithfulness), link to it instead of restating it.

## Licensing

All repositories are MIT. By contributing you agree to license your
contributions under the project's license.
