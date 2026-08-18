---
title: Validación estructural en CI
description: Condiciona tu pipeline de merge a la integridad del modelo con informes legibles por humanos.
---

`validateArchiModel` es un gate de pipeline natural: ejecútalo en un hook de
pre-commit o en un paso de CI y deja que el código de salida bloquee los
merges.

## Un script de verificación reutilizable

```ts
// scripts/validate-model.mts
import { readFile } from 'node:fs/promises';
import { parseArchiModel, validateArchiModel } from '@cda/archi-semantic-core';
import { extractArchiModelXml } from '@cda/archi-semantic-core/archive';

const filePath = process.argv[2];
if (!filePath) {
  console.error('usage: node validate-model.mts <model.archimate>');
  process.exit(2);
}

const bytes = await readFile(filePath);
const model = parseArchiModel(extractArchiModelXml(bytes));
const { valid, errors } = validateArchiModel(model);

for (const issue of errors) {
  console.error(`[${issue.code}] ${issue.path} — ${issue.message}`);
}

if (!valid) {
  console.error(`Model is not valid: ${errors.length} issue(s).`);
  process.exit(1);
}

console.log(`Model OK: ${model.elements.length} elements, ` +
  `${model.relationships.length} relationships, ${model.views.length} views.`);
```

## Conéctalo a tu pipeline

Hook de pre-commit (p. ej. mediante lefthook, husky o un hook de git simple):

```sh
node scripts/validate-model.mts "models/CoreModel.archimate"
```

Paso de CI (ejemplo con GitHub Actions):

```yaml
- name: Validate architecture model
  run: node scripts/validate-model.mts models/CoreModel.archimate
```

## Por qué `extractArchiModelXml` primero

El archivo `.archimate` puede ser un archivo zip (consulta
[Trabajo con archivos .archimate](/es/libraries/archi-semantic-core/getting-started/archives/)); leer los
bytes crudos y pasarlos por `extractArchiModelXml` cubre ambas formas antes
de analizar. La importación del subpath `/archive` es correcta aquí — CI se
ejecuta en Node.

## Convenciones de salida

Usa el código de salida para el gate y el informe para los humanos: cada
[`ArchiValidationIssue`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiValidationIssue/)
ya lleva un localizador `path` dentro del modelo
(p. ej. `relationships[rel-3].sourceId`) además de un `code` con el que
puedes hacer coincidencias (`broken-relationship-source`, `duplicate-id`, …).
Imprímelos todos — el pipeline puede fallar, pero el desarrollador debe saber
exactamente qué corregir.