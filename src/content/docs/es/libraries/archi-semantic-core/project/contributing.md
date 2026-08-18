---
title: Contribuciones
description: Cómo contribuir a archi-semantic-core.
---

Las contribuciones son bienvenidas. El proyecto sigue un pequeño conjunto de
convenciones para que cada cambio sea revisable, comprobable y publicable.

## Configuración del entorno de desarrollo

```sh
npm ci
npm run typecheck
npm test
```

## Flujo de ramas y releases

El repositorio utiliza dos ramas de larga duración:

- `develop` — rama de integración; todos los PRs la tienen como destino.
- `main` — rama de releases; se actualiza **solo** mediante semantic-release
  al publicar.

Los releases se automatizan con semantic-release: los commits deben seguir la
especificación de [Conventional Commits](https://www.conventionalcommits.org/).
Cada commit en `develop` aparece en el changelog y en las notas de release —
escribe mensajes de commit para lectores humanos, no para la herramienta.

## Para qué añadir una prueba

Cualquier cambio de comportamiento en el analizador, el validador o el manejo
de archivos debe incluir pruebas respaldadas por fixtures. La estructura de
fixtures sigue la estructura de las fuentes:

- `tests/fixtures/` — muestras `.archimate` en XML plano y en zip;
- `tests/parser/` — comportamiento de análisis, valores crudos frente a
  semánticos, valores por defecto;
- `tests/validator/` — cada código de issue que el validador puede emitir;
- `tests/archive/` — manejo de zip, incluidos archivos con imágenes
  incrustadas;
- `examples/` — ejemplos de uso ejecutables, cada uno con un harness
  `tests/examples.test.ts`.

## Cambios en la API pública

`src/index.ts` y `src/archive.ts` son todo el contrato público (véase
[Principios de diseño](/es/libraries/archi-semantic-core/project/design-principles/)). Los cambios en ellos:

1. se documentan en JSDoc en el código fuente, ya que la referencia de API de
   este sitio se genera a partir de él;
2. aumentan la versión según las reglas de semantic-release (fix/feat/BREAKING
   CHANGE);
3. nunca llegan en silencio — la descripción del PR debe señalarlos.

## Documentación

Las páginas del sitio viven en `website/src/content/docs/`; el grupo de
referencia de API se genera a partir del JSDoc (`npm run gen:api` dentro de
`website/`) en tiempo de build y deploy — no se hace commit de él. Cuando un
PR cambia la API pública, el JSDoc del código fuente es la documentación; las
páginas generadas lo siguen automáticamente.

## Antes de abrir un PR

```sh
npm run typecheck
npm test
npm run test:published   # exercises the archive pipeline end-to-end
```

Después, abre el PR contra `develop`. Si el cambio es visible para el usuario,
las entradas de las notas de release/changelog se producen automáticamente en
el momento de la publicación — sin edición manual del changelog.
