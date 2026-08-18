---
title: Estilo visual
description: ArchiStyle, ArchiFontStyle y la interacción entre los valores predeterminados de estilo y los valores explícitos.
---

El estilo visual se captura en [`ArchiStyle`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiStyle/)
y [`ArchiFontStyle`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiFontStyle/):

```ts
interface ArchiStyle {
  lineColor: string | null;      // hex color, e.g. "#000000"
  lineWidth: number | null;
  fillColor: string | null;      // hex color, e.g. "#ffffff"
  font: ArchiFontStyle | null;
}

interface ArchiFontStyle {
  name: string | null;
  size: number | null;
  style: string | null;          // e.g. "bold", "italic"
  color: string | null;
}
```

## Análisis seguro frente a null

Cada atributo de estilo se analiza **de forma independiente**: un atributo
ausente o no numérico/no textual produce `null` solo para ese campo — el
analizador nunca inventa `0` ni una cadena vacía, y nunca hace fallar el
objeto completo por culpa de un campo defectuoso. Los valores de estilo se
conservan siempre tal cual los escribió Archi, sin normalización ni
limitación.

## Ejemplo

```ts
const styledElements = model.diagramObjects.filter(
  (o) => o.style?.fillColor === '#ff0000',
);

console.log('red diagram objects:', styledElements.length);
```

## Quiénes llevan estilos

`ArchiStyle` es compartido por los tipos visuales:

- `ArchiDiagramObject`
- `ArchiDiagramConnection`
- `ArchiNote`

Los elementos y las relaciones no llevan estilos — el estilo vive en sus
representaciones visuales, no en el modelo semántico.