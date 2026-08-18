---
title: Objetos de diagrama y conexiones
description: La capa visual — objetos de diagrama, grupos, referencias a modelos, conexiones y notas.
---

La capa visual de un modelo se captura en tres colecciones:
`diagramObjects`, `diagramConnections` y `notes`.

## Objetos de diagrama

Un
[`ArchiDiagramObject`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiDiagramObject/)
es un nodo visual dentro de una vista: un `DiagramObject` de Archi (la
representación visual de un `ArchiElement`) **o cualquier otro contenedor
visual que no sea Note** que Archi pueda colocar en un diagrama — por ejemplo
un `Group`, que no tiene ningún elemento semántico subyacente. Cualquier nodo
de este tipo se preserva de forma genérica.

```ts
interface ArchiDiagramObject {
  viewId: string;
  parentId: string | null;              // null when directly owned by the view
  archimateElementId: string | null;    // the semantic element, or null (e.g. Group)
  referencedModelId: string | null;     // DiagramModelReference only
  childrenIds: string[];                // diagram objects nested directly inside
  connectionIds: string[];              // connections whose source is this object
}
```

### Elementos vs. contenedores

`xsiType`, no `archimateElementId`, es el discriminador correcto entre un
objeto respaldado por un elemento y un contenedor puramente visual: **tanto**
un `DiagramObject` respaldado por un elemento como un `Group` pueden
relacionarse con ids — pero solo un `Group`/referencia tiene
`archimateElementId === null`. Y solo un `DiagramModelReference` (el objeto
de Archi "insertar vista como referencia") tiene un `referencedModelId`, que
puede apuntar a **cualquier** `IDiagramModel` — incluidas las vistas
Sketch/Canvas, no solo a otras `ArchiView`.

## Conexiones

Una
[`ArchiDiagramConnection`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiDiagramConnection/)
es una conexión visual entre dos objetos de diagrama (un `sourceConnection`
de Archi), que normalmente representa una relación ArchiMate subyacente.

```ts
interface ArchiDiagramConnection {
  sourceId: string;                 // a VISUAL id — an ArchiDiagramObject id
  targetId: string;                 // a VISUAL id — an ArchiDiagramObject id
  archimateRelationshipId: string | null; // the semantic relationship, if any
  bendpoints: ArchiBendpoint[];
}
```

Importante: `sourceId`/`targetId` referencian **objetos de diagrama, no
elementos semánticos** — resuélvalos contra `model.diagramObjects` primero y
luego siga `archimateElementId` si necesita los elementos subyacentes.

`archimateRelationshipId` es legítimamente `null` para un vínculo visual
simple sin significado semántico (p. ej. un conector Note-a-Note).

## Notas

Un [`ArchiNote`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiNote/) es una
nota de diagrama de texto libre:

```ts
interface ArchiNote {
  viewId: string;
  parentId: string | null;
  content: string | null;
  bounds: ArchiBounds | null;
  style: ArchiStyle | null;
  features: ArchiFeature[];
}
```

## Geometría anidada

Los objetos de diagrama pueden contener objetos de diagrama (grupos,
contenedores anidados). Los límites de un objeto anidado son **relativos al
origen de su propio padre** — consulte
[Geometría y coordenadas anidadas](/es/libraries/archi-semantic-core/core-concepts/geometry/) para
saber cómo calcular coordenadas absolutas.

## Ejemplo

```ts
// Every element shown in a view, resolved from its diagram objects
const view = model.views.find((v) => v.id === 'view-overview');
const elementIndex = new Map(model.elements.map((e) => [e.id, e]));

const shown = view
  ? view.diagramObjectIds
      .map((id) => model.diagramObjects.find((o) => o.id === id))
      .flatMap((o) => (o?.archimateElementId ? [elementIndex.get(o.archimateElementId)] : []))
      .filter(Boolean)
  : [];
```