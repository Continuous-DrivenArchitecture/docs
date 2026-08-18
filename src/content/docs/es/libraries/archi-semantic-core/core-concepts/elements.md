---
title: Elementos
description: ArchiElement — elementos semánticos, tipos crudos vs. semánticos, carpetas y propiedades.
---

Un
[`ArchiElement`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiElement/)
representa un elemento ArchiMate semántico — BusinessActor,
ApplicationComponent, TechnologyService o cualquier otro tipo que Archi
soporte. El analizador cubre **cualquier tipo de elemento de forma genérica**:
no codifica un catálogo fijo de nombres de tipos.

## Tipos crudos y semánticos

Cada elemento expone ambos:

```ts
interface ArchiElement {
  xsiType: string; // verbatim native XML value, e.g. "archimate:BusinessActor"
  type: string;    // namespace-prefix-stripped, e.g. "BusinessActor"
}
```

La derivación es genérica — el analizador elimina el prefijo de espacio de
nombres sin exigir que el nombre del tipo se conozca de antemano. Esto es lo
que mantiene el paquete funcionando con tipos de elemento que Archi introduzca
en el futuro.

## Dónde vive un elemento

```ts
interface ArchiElement {
  folderId: string;     // the id of the containing folder
  folderPath: string;   // slash-joined folder names from the model root, e.g. "Business/Actor"
}
```

`folderPath` se precalcula en el momento del análisis, de modo que mostrar o
agrupar por ruta no requiere recorrer la jerarquía de carpetas.

## Documentación y propiedades

```ts
interface ArchiElement {
  name: string | null;
  documentation: string | null;
  properties: ArchiProperty[]; // { key, value } entries
}
```

## Perfiles

Los elementos referencian Especializaciones y Perfiles genéricos por id:

```ts
interface ArchiElement {
  profiles: string[]; // ArchiProfile.id values; empty when none are set
}
```

Resuélvalos contra `model.profiles` (consulte
[Perfiles y Especializaciones](/es/libraries/archi-semantic-core/semantics/profiles-specializations/)).

## Campos de Unión

Las Uniones también son elementos y llevan un discriminador nativo separado:

```ts
interface ArchiElement {
  junctionType: ArchiJunctionType | null; // 'And' | 'Or', or null
  rawJunctionType: string | null;         // verbatim native value
}
```

Para todo elemento que no sea una Unión, ambos campos son `null`. Consulte
[Uniones](/es/libraries/archi-semantic-core/semantics/junctions/) para las reglas de
decodificación.

## Ejemplo

```ts
const actors = model.elements.filter((e) => e.type === 'BusinessActor');

for (const actor of actors) {
  console.log(actor.name, '—', actor.folderPath);
}
```