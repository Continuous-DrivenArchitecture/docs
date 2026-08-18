---
title: Crear índices de búsqueda
description: Convertir colecciones planas basadas en id en tablas de búsqueda O(1).
---

Las colecciones del modelo son arreglos planos cuyas referencias cruzadas son
id de cadena simples (consulta [ID y referencias](/es/libraries/archi-semantic-core/core-concepts/ids-references/)).
Para cualquier cosa más allá de búsquedas puntuales, crea un índice `Map` una
sola vez — una única pasada O(n) que se amortiza en cada búsqueda posterior.

```ts
import { parseArchiModel } from '@cda/archi-semantic-core';

const model = parseArchiModel(xml);

const elementById = new Map(model.elements.map((e) => [e.id, e]));
const relationshipById = new Map(model.relationships.map((r) => [r.id, r]));
const folderById = new Map(model.folders.map((f) => [f.id, f]));
const objectById = new Map(model.diagramObjects.map((o) => [o.id, o]));
const profileById = new Map(model.profiles.map((p) => [p.id, p]));
```

## Resolución de extremos de relaciones

El origen o el destino de una relación puede ser un **elemento u otra
relación** (consulta [Relaciones](/es/libraries/archi-semantic-core/core-concepts/relationships/)), por lo
que se resuelve desde ambos índices:

```ts
function nodeName(id: string): string | null {
  return elementById.get(id)?.name ?? relationshipById.get(id)?.name ?? null;
}
```

## Resolución de la capa visual

Los `sourceId`/`targetId` de una conexión apuntan a **objetos de diagrama**,
no a elementos semánticos. Sigue la cadena:

```ts
function elementForObject(objectId: string) {
  const object = objectById.get(objectId);
  return object?.archimateElementId
    ? elementById.get(object.archimateElementId)
    : undefined;
}
```

## Navegación local a la vista

Las vistas precalculan su contención (consulta [Vistas](/es/libraries/archi-semantic-core/core-concepts/views/)),
por lo que iterar los objetos de diagrama de una vista es directo:

```ts
function objectsInView(viewId: string) {
  const view = model.views.find((v) => v.id === viewId);
  if (!view) return [];
  return view.diagramObjectIds
    .map((id) => objectById.get(id))
    .filter(Boolean);
}
```

## Cuándo omitir los índices

Para un solo recorrido de una colección, `find`/`filter` son suficientes y
más simples. Crea índices cuando vayas a buscar cosas repetidamente —
normalmente en cualquier renderizador, recorrido de análisis de impacto o
generador de informes.