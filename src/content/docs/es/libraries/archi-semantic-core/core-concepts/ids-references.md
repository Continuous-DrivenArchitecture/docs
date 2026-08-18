---
title: IDs y referencias
description: Cómo funcionan la identidad y las referencias cruzadas en todo el modelo.
---

Cada entidad en un modelo de Archi tiene un id de cadena, y todas las
referencias cruzadas son ids de cadena simples. Comprender este modelo es la
clave para usar bien la librería.

## Un único conjunto de ids compartido

Archi extrae todos los ids — semánticos y visuales — de **un único conjunto
compartido**: carpetas, elementos, relaciones, vistas, objetos de diagrama,
conexiones de diagrama y notas comparten un espacio de nombres. Un
`duplicate-id` entre cualesquiera dos de ellos es un problema real de
integridad, y `validateArchiModel` lo detecta.

## Las referencias cruzadas son cadenas

El modelo nunca incrusta referencias a objetos. En su lugar:

| Campo | Se resuelve contra |
| --- | --- |
| `element.folderId` | `model.folders` |
| `relationship.sourceId` / `targetId` | `model.elements` (ocasionalmente `model.relationships`) |
| `diagramObject.viewId` | `model.views` |
| `diagramObject.archimateElementId` | `model.elements` |
| `diagramObject.referencedModelId` | cualquier `IDiagramModel` (vista o sketch) |
| `diagramConnection.sourceId` / `targetId` | `model.diagramObjects` |
| `diagramConnection.archimateRelationshipId` | `model.relationships` |
| `element.profiles` / `relationship.profiles` | `model.profiles` |

## Índices de contención precalculados

El XML nativo solo expresa la contención mediante anidamiento (un `<child>`
dentro de un `<child>`, una `<folder>` dentro de una `<folder>`).
`parseArchiModel` realiza una pasada de derivación O(n) adicional para que
cada padre ya tenga precalculados los ids de sus hijos, en orden de origen —
sin necesidad de recorrer árboles por parte de quien llama:

```ts
interface ArchiView {
  diagramObjectIds: string[];     // direct-child diagram objects (not nested)
  diagramConnectionIds: string[]; // every connection anywhere in the view, any nesting depth
  noteIds: string[];              // direct-child notes (not nested)
}

interface ArchiDiagramObject {
  childrenIds: string[];    // diagram objects nested directly inside this one
  connectionIds: string[];  // connections whose source is this diagram object
}

interface ArchiFolder {
  containedIds: string[];   // elements/relationships/views directly inside (not sub-folders)
}
```

La jerarquía de subcarpetas se expresa al revés: recorra el `parentId` propio
de cada carpeta en lugar de buscarla en el `containedIds` de un padre.

## Sin helpers de búsqueda — por diseño

El paquete intencionalmente **no** incluye helpers de búsqueda. Quienes
necesitan búsquedas repetidas construyen índices `Map<string, ...>`
adecuados a su propia carga de trabajo — una pasada O(n) única que convierte
cada búsqueda posterior en O(1). Consulte [Construir índices de búsqueda](/es/libraries/archi-semantic-core/guides/lookup-indexes/).