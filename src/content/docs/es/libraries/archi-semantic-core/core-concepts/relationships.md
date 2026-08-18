---
title: Relaciones
description: ArchiRelationship — orígenes, destinos y atributos nativos específicos de relación.
---

Una
[`ArchiRelationship`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiRelationship/)
representa una relación ArchiMate semántica — Serving, Assignment,
Realization, Access, Composition, Aggregation, Association o cualquier otro
tipo. Al igual que con los elementos, la cobertura es genérica.

## Extremos

```ts
interface ArchiRelationship {
  sourceId: string; // id of the source element (occasionally another relationship)
  targetId: string; // id of the target element (occasionally another relationship)
}
```

El modelo de dominio permite que una relación sea el **origen o destino de
otra relación**. Al recorrer, resuelva los nodos desde las colecciones
`elements` y `relationships` (consulte
[Análisis de impacto](/es/libraries/archi-semantic-core/guides/impact-analysis/)).

## Tipos crudos y semánticos

Exactamente como los elementos, las relaciones exponen tanto el `xsiType`
literal (p. ej. `"archimate:ServingRelationship"`) como el `type` sin
prefijo (p. ej. `"ServingRelationship"`).

## Atributos nativos específicos de relación

Tres tipos de relación llevan atributos nativos que el analizador decodifica
semánticamente. Para cualquier otro tipo de relación, los campos son `null`:

| Relación | Campo | Valores | Valor por defecto si está ausente |
| --- | --- | --- | --- |
| Access | `accessType` | `'Write' \| 'Read' \| 'Unspecified' \| 'ReadWrite'` | `'Write'` (valor nativo por defecto de Archi) |
| Influence | `strength` | texto libre, p. ej. `"+"`, `"-"` | `null` (sin modificador establecido) |
| Association | `directed` | `boolean` | `false` |

Cada atributo tiene una página dedicada:

- [Relaciones Access](/es/libraries/archi-semantic-core/semantics/access-relationships/)
- [Relaciones Influence](/es/libraries/archi-semantic-core/semantics/influence-relationships/)
- [Relaciones Association](/es/libraries/archi-semantic-core/semantics/association-relationships/)

## Ejemplo

```ts
// All access relationships together with their resolved endpoints
const accessRelationships = model.relationships.filter(
  (r) => r.type === 'AccessRelationship',
);

const byId = new Map(model.elements.map((e) => [e.id, e]));

for (const rel of accessRelationships) {
  console.log(
    byId.get(rel.sourceId)?.name,
    rel.accessType,
    byId.get(rel.targetId)?.name,
  );
}
```