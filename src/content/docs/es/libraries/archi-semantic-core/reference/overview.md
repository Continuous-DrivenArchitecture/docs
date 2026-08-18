---
title: Referencia de API
description: El contrato tipado completo de @cda/archi-semantic-core.
---

Esta referencia se **genera** a partir del paquete npm publicado mediante
TypeDoc y documenta el contrato público exacto de `@cda/archi-semantic-core` —
ni más, ni menos.

## Fuente de la verdad

La verdad del contrato de API vive **en el repositorio de la librería**, en el
JSDoc de su código fuente (`src/index.ts`, `src/archive.ts`). Este portal
regenera la referencia a partir del paquete instalado
(`node_modules/@cda/archi-semantic-core`) en tiempo de build — la versión
fijada en el `package.json` del portal. Lo que lees aquí es exactamente lo que
instalas; nada se copia a mano.

## Puntos de entrada

El paquete expone dos subrutas públicas:

- **Raíz** — `@cda/archi-semantic-core` (seguro para navegador/bundler):
  `parseArchiModel`, `validateArchiModel`, `getLabelExpression`,
  `resolveLabelExpression` y todos los tipos de modelo.
- **`/archive`** — `@cda/archi-semantic-core/archive` (solo Node):
  `extractArchiModelXml`.

## Cómo leer esta referencia

Cada página de este grupo se produce a partir de los comentarios JSDoc
incluidos en los archivos de declaración del paquete. Los grupos de navegación
reflejan la estructura de las fuentes:

- [Funciones](/libraries/archi-semantic-core/reference/generated/functions/parseArchiModel/) — las
  cuatro funciones principales más la función de archivo solo-Node.
- [Tipos e interfaces](/libraries/archi-semantic-core/reference/generated/interfaces/ArchiModel/) —
  la familia `ArchiModel`: elementos, relaciones, vistas, geometría,
  estilos, features, perfiles, resultados de validación.

## Política de versiones

La referencia documenta la **versión publicada fijada en el portal**
(`@cda/archi-semantic-core` 0.4.1 en el momento de escribir esto). Para
comprobar qué versión documenta el portal:

```sh
npm view @cda/archi-semantic-core
```

Para documentar una versión más reciente, sube la dependencia fijada en el
`package.json` del portal y reconstruye.

## Regeneración

Las páginas se generan con `npm run gen:api` y se regeneran en cada build y en
el pipeline de despliegue de Pages — no se hace commit de ellas en el
repositorio. Regenera, nunca edites a mano.
