---
title: Primeros pasos
description: Un ejemplo completo de CDA en acción, desde el archivo de modelo hasta la compuerta de validación.
---

Esta página recorre el primer uso completo de CDA con la librería actual:
tomar un archivo de modelo de Archi real y convertirlo en algo sobre lo que
CI pueda actuar.

## 1. Instalación

```sh
npm install @cda/archi-semantic-core
```

Requisitos: Node.js `^20 || ^22 || >=24`, ESM.

## 2. Análisis

```ts
import { readFile } from 'node:fs/promises';
import { parseArchiModel } from '@cda/archi-semantic-core';
import { extractArchiModelXml } from '@cda/archi-semantic-core/archive';

const bytes = await readFile('MyModel.archimate');
const model = parseArchiModel(extractArchiModelXml(bytes));

console.log(model.elements.length, 'elements');
console.log(model.relationships.length, 'relationships');
```

El subpath `archive` maneja tanto archivos `.archimate` en XML puro como en
zip — lee bytes, nunca decodifiques un zip como texto.

## 3. Validación

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

## 4. Automatización

Conecta el paso de validación a CI y el modelo de arquitectura se convierte
en una compuerta de tu pipeline, igual que el linting lo es para el código
fuente:

```yaml
- name: Validate architecture model
  run: node scripts/validate-model.mts models/CoreModel.archimate
```

## A dónde ir ahora

- Documentación completa de la librería:
  [archi-semantic-core](/es/libraries/archi-semantic-core/getting-started/introduction/)
- Cómo funciona internamente:
  [Arquitectura del ecosistema](/es/architecture/ecosystem/)
- Lo que está planificado:
  [Hoja de ruta](/es/architecture/roadmap/)
