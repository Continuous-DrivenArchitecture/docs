---
title: Relaciones de asociación
description: AssociationRelationship.directed — el booleano de direccionalidad nativo de Archi.
---

`AssociationRelationship.directed` se resuelve a un booleano para las
relaciones de asociación:

```ts
interface ArchiRelationship {
  directed: boolean | null;
}
```

## Valores predeterminados

- Para un `AssociationRelationship`, el campo **siempre se resuelve a un
  booleano** — `false` es el valor predeterminado nativo cuando el atributo
  está ausente (el valor predeterminado propio del tipo en Archi).
- Para cualquier otro tipo de relación, `directed` es `null`.

## Ejemplo

```ts
const undirected = model.relationships.filter(
  (r) => r.type === 'AssociationRelationship' && r.directed === false,
);

console.log('undirected associations:', undirected.length);
```