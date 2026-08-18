---
title: Relaciones de influencia
description: InfluenceRelationship.strength — el modificador de texto libre nativo de Archi.
---

`InfluenceRelationship.strength` contiene el **modificador de texto libre**
nativo, por ejemplo `"+"`, `"-"` o cualquier otro texto que el modelador
escribiera:

```ts
interface ArchiRelationship {
  strength: string | null;
}
```

## Valores predeterminados

El campo es `null`:

- para todo tipo de relación distinto de `InfluenceRelationship`;
- cuando el valor nativo está en blanco o ausente.

A diferencia de `accessType` (donde el valor predeterminado de Archi es un
valor real, `'Write'`), el valor predeterminado nativo de `strength` es
genuinamente "sin modificador definido" — por lo que `null` es la
representación fiel.

## Ejemplo

```ts
const influences = model.relationships.filter(
  (r) => r.type === 'InfluenceRelationship' && r.strength,
);

for (const rel of influences) {
  console.log(rel.sourceId, `[${rel.strength}]`, rel.targetId);
}
```