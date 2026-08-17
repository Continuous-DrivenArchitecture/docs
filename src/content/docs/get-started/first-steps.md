---
title: First steps
description: A working end-to-end example of CDA in action, from model file to validation gate.
---

This page walks through the first end-to-end use of CDA with the current
library: taking a real Archi model file and turning it into something CI
can act on.

## 1. Install

```sh
npm install @cda/archi-semantic-core
```

Requirements: Node.js `^20 || ^22 || >=24`, ESM.

## 2. Parse

```ts
import { readFile } from 'node:fs/promises';
import { parseArchiModel } from '@cda/archi-semantic-core';
import { extractArchiModelXml } from '@cda/archi-semantic-core/archive';

const bytes = await readFile('MyModel.archimate');
const model = parseArchiModel(extractArchiModelXml(bytes));

console.log(model.elements.length, 'elements');
console.log(model.relationships.length, 'relationships');
```

The `archive` subpath handles both plain-XML and zip `.archimate` files —
read bytes, never text-decode a zip.

## 3. Validate

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

## 4. Automate

Wire the validation step into CI and the architecture model becomes a
gate in your pipeline, the same way linting gates source code:

```yaml
- name: Validate architecture model
  run: node scripts/validate-model.mts models/CoreModel.archimate
```

## Where to go next

- Full library documentation:
  [archi-semantic-core](/libraries/archi-semantic-core/getting-started/introduction/)
- How it works under the hood:
  [Ecosystem architecture](/architecture/ecosystem/)
- What is planned:
  [Roadmap](/architecture/roadmap/)
