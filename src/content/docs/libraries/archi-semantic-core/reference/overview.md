---
title: API Reference
description: The complete typed contract of @cda/archi-semantic-core.
---

This reference is **generated** from the published npm package by TypeDoc
and documents the exact public contract of `@cda/archi-semantic-core` —
nothing more, nothing less.

## Source of truth

The truth of the API contract lives **in the library's repository**, in the
JSDoc of its source (`src/index.ts`, `src/archive.ts`). This portal
regenerates the reference from the installed package
(`node_modules/@cda/archi-semantic-core`) at build time — the version
pinned in the portal's `package.json`. What you read here is exactly what
you install; nothing is copied by hand.

## Entrypoints

The package exposes two public subpaths:

- **Root** — `@cda/archi-semantic-core` (browser/bundler safe):
  `parseArchiModel`, `validateArchiModel`, `getLabelExpression`,
  `resolveLabelExpression`, and all model types.
- **`/archive`** — `@cda/archi-semantic-core/archive` (Node-only):
  `extractArchiModelXml`.

## Reading this reference

Every page in this group is produced from the JSDoc comments shipped in the
package's declaration files. The navigation groups mirror the source layout:

- [Functions](/libraries/archi-semantic-core/reference/generated/functions/parseArchiModel/) — the
  four core functions plus the Node-only archive function.
- [Types and interfaces](/libraries/archi-semantic-core/reference/generated/interfaces/ArchiModel/) —
  the `ArchiModel` family: elements, relationships, views, geometry,
  styling, features, profiles, validation results.

## Version policy

The reference documents the **published version pinned in the portal**
(`@cda/archi-semantic-core` 0.4.1 at the time of writing). To check what
version the portal documents:

```sh
npm view @cda/archi-semantic-core
```

To document a newer version, bump the pinned dependency in the portal's
`package.json` and rebuild.

## Regenerating

The pages are produced by `npm run gen:api` and are regenerated on every
build and in the Pages deployment pipeline — they are not committed to the
repository. Regenerate, never hand-edit.
