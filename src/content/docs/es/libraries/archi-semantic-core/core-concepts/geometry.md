---
title: Geometría y coordenadas anidadas
description: Límites relativos a los padres, seguridad ante null y representación de puntos de control.
---

## Límites (Bounds)

```ts
interface ArchiBounds {
  x: number | null;
  y: number | null;
  width: number | null;
  height: number | null;
}
```

:::caution[Las coordenadas anidadas son relativas]

**`ArchiBounds.x`/`.y` en un objeto de diagrama o nota anidados son relativos
al origen de su propio padre, no coordenadas absolutas del lienzo** — así es
como el propio Archi almacena la geometría anidada de forma nativa.

Un objeto de diagrama con `parentId: 'group-1'` y
`bounds: { x: 10, y: 10, ... }` se sitúa 10px a la derecha y 10px hacia abajo
desde la esquina superior izquierda de `group-1`, no de la vista.

:::

Para obtener coordenadas absolutas, sume `x`/`y` hacia arriba por la cadena
`parentId` hasta la raíz. Los objetos a nivel de raíz (`parentId === null`)
ya tienen coordenadas relativas a la vista (es decir, absolutas):

```ts
function absoluteBounds(
  object: ArchiDiagramObject,
  byId: Map<string, ArchiDiagramObject>,
): ArchiBounds | null {
  let current = object;
  let offsetX = 0;
  let offsetY = 0;

  while (current.parentId) {
    const parent = byId.get(current.parentId);
    if (!parent?.bounds?.x || !parent?.bounds?.y) break;
    offsetX += parent.bounds.x;
    offsetY += parent.bounds.y;
    current = parent;
  }

  return object.bounds
    ? {
        x: object.bounds.x !== null ? object.bounds.x + offsetX : null,
        y: object.bounds.y !== null ? object.bounds.y + offsetY : null,
        width: object.bounds.width,
        height: object.bounds.height,
      }
    : null;
}
```

## Los campos anulables son significativos

Cualquiera de los cuatro campos puede ser `null` de forma independiente — el
analizador nunca fabrica un `0` para un atributo faltante o no numérico.
`validateArchiModel` **no** comprueba la integridad de los límites; trate un
campo `null` como "no puede posicionarse".

## Puntos de control (Bendpoints)

```ts
interface ArchiBendpoint {
  startX: number | null;
  startY: number | null;
  endX: number | null;
  endY: number | null;
}
```

Los valores de `ArchiBendpoint` siguen la representación nativa del propio
Archi: cada punto de control almacena su propio **par inicio/fin** en lugar de
un único punto medio, lo que permite reconstruir la curva de una conexión
doblada sin lógica geométrica adicional.