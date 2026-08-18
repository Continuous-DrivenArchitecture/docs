---
title: Uniones
description: Cómo se decodifica la identidad de las uniones AND/OR desde el atributo de tipo nativo de Archi.
---

Archi almacena la identidad de las uniones AND/OR mediante un atributo nativo
`type` que es **independiente** del `xsi:type` del elemento.

Para una unión, el analizador expone tanto el valor semántico interpretado
como el valor nativo original:

```ts
type ArchiJunctionType = 'And' | 'Or';

interface ArchiElement {
  junctionType: ArchiJunctionType | null;
  rawJunctionType: string | null;
}
```

## Reglas de decodificación

| `type` nativo de la unión | `junctionType` | `rawJunctionType` |
| --- | --- | --- |
| ausente | `'And'` | `''` |
| `""` | `'And'` | `''` |
| `"or"` | `'Or'` | `'or'` |
| cualquier otro valor | `null` | valor original |

Coinciden con las constantes propias de `IJunction` de Archi
(`AND_JUNCTION_TYPE = ""`, `OR_JUNCTION_TYPE = "or"`), confirmadas contra el
código fuente de Archi.

## Nunca se adivina

Los valores nativos desconocidos nunca se adivinan ni se descartan:

- `parseArchiModel` sigue teniendo éxito — el modelo se analiza con normalidad;
- `rawJunctionType` conserva siempre el valor original, se entienda o no;
- `validateArchiModel` informa de `unrecognized-junction-type` para una unión
  cuyo valor nativo no puede resolverse.

## Elementos que no son uniones

Para todo elemento que no sea una unión, ambos campos son `null`:

```ts
junctionType === null
rawJunctionType === null
```