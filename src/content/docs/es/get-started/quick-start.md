---
title: Inicio rápido
description: Instale una librería de CDA, cargue un modelo y obtenga un resultado tipado y validado — en unos cinco minutos.
---

Un ejemplo completo de principio a fin con la librería actual, desde la
instalación hasta un resultado tipado y validado. No se requieren
conocimientos previos de Archi ni de ArchiMate®.

## 1. Instale

```sh
npm install @cda/archi-semantic-core
```

Requisitos: Node.js `^20 || ^22 || >=24`, solo ESM, tipos de TypeScript
incluidos en el paquete.

## 2. Cargue

`parseArchiModel` acepta texto XML nativo de Archi (`.archimate`). Para un
archivo real, léalo del disco (o obténgalo por red) y pase la cadena XML — la
[guía de archivos](/es/libraries/archi-semantic-core/getting-started/archives/)
cubre la variante zip de los archivos `.archimate`:

```ts
import { readFile } from 'node:fs/promises';
import { parseArchiModel } from '@cda/archi-semantic-core';

const xmlText = await readFile('MyModel.archimate', 'utf8');
const model = parseArchiModel(xmlText);
```

## 3. Inspeccione

El modelo parseado es un `ArchiModel` tipado con colecciones planas de
carpetas, elementos, relaciones, vistas, objetos de diagrama y conexiones:

```ts
model.elements.map((e) => e.type);      // ["BusinessActor", ...]
model.elements.map((e) => e.name);      // ["Customer", ...]
model.relationships.length;             // 2
```

Los tipos no llevan prefijo de espacio de nombres (`"BusinessActor"`, no
`"archimate:BusinessActor"`), y las referencias cruzadas como
`relationship.sourceId` son cadenas de ids simples — consulte
[IDs y referencias](/es/libraries/archi-semantic-core/core-concepts/ids-references/).

## 4. Resultado

Ejecute el validador estructural sobre el modelo parseado — ids faltantes o
duplicados y referencias colgantes se reportan como incidencias tipadas:

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

Ese es el ciclo completo: parsear un modelo nativo, leerlo como datos
tipados y condicionar su pipeline a la integridad estructural — igual que el
lint condiciona el código fuente.

## Siguientes pasos

- [Analice su primer modelo](/es/libraries/archi-semantic-core/getting-started/parse-first-model/) — un recorrido más detallado.
- [Valide un modelo](/es/libraries/archi-semantic-core/getting-started/validate-model/) — todas las comprobaciones del validador.
- [Trabajar con archivos .archimate](/es/libraries/archi-semantic-core/getting-started/archives/) — XML plano frente a archivos zip.
- [Validación estructural en CI](/es/libraries/archi-semantic-core/guides/validation-in-ci/) — conéctelo a un pipeline.
