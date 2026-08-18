---
title: Expresiones de etiqueta
description: Leer y resolver las expresiones de etiqueta ${...} de Archi en objetos de diagrama, conexiones y notas.
---

Archi permite que una etiqueta sea una **expresión de etiqueta** — una
plantilla evaluada en tiempo de renderizado, almacenada en las `features` de
un objeto bajo la clave `labelExpression`:

```text
${name}${newline}${property:First}
```

## `getLabelExpression`

[`getLabelExpression`](/es/libraries/archi-semantic-core/reference/generated/functions/getLabelExpression/)
devuelve la cadena de expresión **cruda** de la lista de
[`ArchiFeature`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiFeature/)
de un objeto, o `null` cuando no hay ninguna definida:

```ts
import { getLabelExpression } from '@cda/archi-semantic-core';

const expr = getLabelExpression(diagramObject.features);
console.log(expr); // "${name}\n${property:First}" or null
```

Si solo necesitas *detectar* si existe una expresión de etiqueta, prefiere
esta función sobre `resolveLabelExpression` — no se necesita acceso al
modelo.

## `resolveLabelExpression`

[`resolveLabelExpression`](/es/libraries/archi-semantic-core/reference/generated/functions/resolveLabelExpression/)
evalúa la expresión contra el modelo y devuelve el texto de la etiqueta:

```ts
import { resolveLabelExpression } from '@cda/archi-semantic-core';

const label = resolveLabelExpression(model, diagramObject);
console.log(label);
```

El argumento `node` es un **objeto de diagrama, una conexión de diagrama o
una nota** — los objetos visuales que llevan etiquetas. Devuelve `null`
cuando no hay una característica `labelExpression` (nada que evaluar —
distinto de un resultado de cadena vacía).

## Marcadores de posición admitidos

El resolutor admite los marcadores de posición "básicos" que se resuelven a
partir del propio objeto:

| Marcador de posición | Se resuelve a |
| --- | --- |
| `${name}` | el nombre del objeto |
| `${documentation}` | la documentación del objeto |
| `${content}` | el contenido de una nota |
| `${type}` | el tipo del objeto |
| `${strength}` | la fuerza de una relación de influencia |
| `${accessType}` | el tipo de acceso de una relación de acceso |
| `${property:key}` | el valor de una propiedad por clave |
| `${properties}`, `${propertiesvalues}` | listas de propiedades unidas |
| `${properties:separator:key}` | listas de propiedades con un separador |
| `${wordwrap:count:expression}` | texto ajustado por palabras |
| `${if:cond:val}` / `${if:cond:val1:val2}` / `${nvl:cond:val}` | auxiliares de condicionales y valores predeterminados |

Se admiten expresiones **anidadas dentro de los argumentos de otra
expresión**.

## Lo que queda sin resolver

Dos grupos se dejan deliberadamente **tal cual, sin resolver**, en la salida:

- las formas de **Prefijo de referencia** — `${parent{...}}`, `${source{...}}`,
  `${model{...}}`, `${<relationship>:source{...}}` y similares — porque
  resolverlas requiere recorrer el grafo del modelo (vista/carpeta
  contenedora, relaciones conectadas) en lugar de leer el propio objeto;
- `${specialization}` y `${viewpoint}` — todavía no capturados por el
  analizador.

Si tus modelos dependen de estos, trata el marcador de posición sin resolver
en la salida como una señal, no como una etiqueta terminada.