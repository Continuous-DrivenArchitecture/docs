---
title: Vistas
description: ArchiView — definiciones de diagrama, puntos de vista e índices de contención precalculados.
---

Un
[`ArchiView`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiView/)
es una definición de diagrama/vista de Archi (un `archimate:ArchimateDiagramModel`):
el contenedor que une los objetos visuales.

## Atributos nativos

```ts
interface ArchiView {
  viewpoint: string | null;             // e.g. "layered", "organization"
  connectionRouterType: number | null;  // 0 = manual bendpoints, 2 = orthogonal
}
```

- `viewpoint` es el **código interno en minúsculas** de Archi — no un nombre
  legible por humanos. `null` cuando no está establecido (el valor por defecto
  del propio Archi es una cadena vacía, que significa "sin restricción de
  punto de vista").
- `connectionRouterType` se preserva como el **número nativo crudo** en lugar
  de decodificarse a una enumeración con nombre: su significado es específico
  de la interfaz de Archi y la numeración ya ha cambiado una vez en el código
  fuente de Archi (un valor `1` fue reservado y eliminado). `null` cuando está
  ausente (el valor por defecto de Archi es `0`).

## Índices de contención precalculados

El XML nativo expresa la contención solo mediante anidamiento.
`parseArchiModel` realiza una pasada de derivación O(n) adicional para que
cada vista ya tenga precalculados los ids de sus hijos, en orden de origen —
sin necesidad de recorrer árboles por parte de quien llama:

```ts
interface ArchiView {
  diagramObjectIds: string[];     // direct-child diagram objects (not nested)
  diagramConnectionIds: string[]; // every connection anywhere in the view, any nesting depth
  noteIds: string[];              // direct-child notes (not nested)
}
```

## Ejemplo

```ts
const view = model.views.find((v) => v.name === 'Application Overview');
if (!view) return;

for (const id of view.diagramObjectIds) {
  const object = model.diagramObjects.find((o) => o.id === id);
  console.log(object?.name, object?.xsiType);
}
```

Para búsquedas repetidas, construya un índice de ids una sola vez en lugar de
usar `find` en un bucle — consulte [Construir índices de búsqueda](/es/libraries/archi-semantic-core/guides/lookup-indexes/).