---
title: Quick Start
description: Install a CDA library, load a model, and produce a typed, validated result — in about five minutes.
---

A working example end to end with the current library, from installation to
a typed, validated result. No prior Archi or ArchiMate® knowledge needed.

## 1. Install

```sh
npm install @cda/archi-semantic-core
```

Requirements: Node.js `^20 || ^22 || >=24`, ESM-only, TypeScript types
bundled in the package.

## 2. Load

`parseArchiModel` accepts native Archi `.archimate` XML text. For a real
file, read it from disk (or fetch it) and pass the XML string — the
[archive guide](/libraries/archi-semantic-core/getting-started/archives/)
covers zip-archive `.archimate` files:

```ts
import { readFile } from 'node:fs/promises';
import { parseArchiModel } from '@cda/archi-semantic-core';

const xmlText = await readFile('MyModel.archimate', 'utf8');
const model = parseArchiModel(xmlText);
```

## 3. Inspect

The parsed model is a typed `ArchiModel` with flat collections of folders,
elements, relationships, views, diagram objects and connections:

```ts
model.elements.map((e) => e.type);      // ["BusinessActor", ...]
model.elements.map((e) => e.name);      // ["Customer", ...]
model.relationships.length;             // 2
```

Types are namespace-prefix-stripped (`"BusinessActor"`, not
`"archimate:BusinessActor"`), and cross-references such as
`relationship.sourceId` are plain string ids — see
[IDs and references](/libraries/archi-semantic-core/core-concepts/ids-references/).

## 4. Result

Run the structural validator on the parsed model — missing or duplicate ids
and dangling references are reported as typed issues:

```ts
import { validateArchiModel } from '@cda/archi-semantic-core';

const { valid, errors } = validateArchiModel(model);

if (!valid) {
  for (const issue of errors) {
    console.error(`[${issue.code}] ${issue.path} — ${issue.message}`);
  }
  process.exit(1);
}
```

That is the whole loop: parse a native model, read it as typed data, and
gate your pipeline on its structural integrity — the same way linting gates
source code.

## Next steps

- [Parse your first model](/libraries/archi-semantic-core/getting-started/parse-first-model/) — a closer walkthrough.
- [Validate a model](/libraries/archi-semantic-core/getting-started/validate-model/) — every check the validator performs.
- [Working with .archimate archives](/libraries/archi-semantic-core/getting-started/archives/) — plain XML vs. zip files.
- [Structural validation in CI](/libraries/archi-semantic-core/guides/validation-in-ci/) — wire this into a pipeline.
