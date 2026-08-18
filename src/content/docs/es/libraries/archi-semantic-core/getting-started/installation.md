---
title: Instalación
description: Requisitos, comandos de instalación y formato de módulo de @cda/archi-semantic-core.
---

```sh
npm install @cda/archi-semantic-core
```

## Requisitos

- **Node.js**: `^20.0.0 || ^22.0.0 || >=24.0.0` (consulte `engines` en `package.json`).
- El paquete es **solo ESM** (`"type": "module"`). No se admite CommonJS
  `require('@cda/archi-semantic-core')`.
- La raíz del paquete **no tiene dependencias de Node** y puede ser consumida
  por bundlers de navegador modernos. El único punto de entrada para el
  manejo de archivos (`@cda/archi-semantic-core/archive`) es solo para Node.

## Dos puntos de entrada

El paquete expone dos subpaths públicos:

```ts
// Browser/bundler safe — pure parsing, validation and label expressions.
import { parseArchiModel, validateArchiModel } from '@cda/archi-semantic-core';

// Node-only — .archimate zip-archive handling (uses node:zlib).
import { extractArchiModelXml } from '@cda/archi-semantic-core/archive';
```

El subpath `/archive` existe porque la descompresión usa el `zlib` integrado
de Node; mantenerlo fuera del punto de entrada raíz preserva la
compatibilidad con navegadores para la API principal. Esta es una frontera de
plataforma intencional — consulte
[Trabajar con archivos .archimate](/es/libraries/archi-semantic-core/getting-started/archives/).

## TypeScript

Los tipos se distribuyen dentro del paquete (`dist/index.d.ts`), por lo que no
se necesita ningún paquete `@types/*` por separado. El paquete requiere el
`moduleResolution: "node16"`/`"nodenext"` de TypeScript o una resolución que
respete los bundlers para honrar el mapa `exports`.

## Cómo verificar la instalación

```ts
import { parseArchiModel } from '@cda/archi-semantic-core';

const model = parseArchiModel('<archimate:model xmlns:archimate="http://www.archimatetool.com/archimate"/>');
console.log(model.metadata.id);
```