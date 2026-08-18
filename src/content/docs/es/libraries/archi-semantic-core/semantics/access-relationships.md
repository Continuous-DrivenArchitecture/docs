---
title: Relaciones de acceso
description: AccessRelationship.accessType decodificado desde la representación nativa 0-3 de Archi.
---

`AccessRelationship.accessType` se expone como:

```ts
type ArchiAccessType = 'Write' | 'Read' | 'Unspecified' | 'ReadWrite';
```

Se decodifica desde la representación de atributo nativa `0`–`3` de Archi. La
enumeración sigue las constantes propias de `IAccessRelationship` de Archi
(`WRITE_ACCESS`, `READ_ACCESS`, `UNSPECIFIED_ACCESS`, `READ_WRITE_ACCESS`)
en lugar del vocabulario `AccessTypeEnum` del ArchiMate Open Exchange — que
utiliza `"Access"` para el caso no especificado. Esa es la nomenclatura de
otro formato, no la de este.

## Valores predeterminados

Para un `AccessRelationship`, el campo **siempre se resuelve a un valor**:

- cuando el atributo nativo está presente, se decodifica;
- cuando está ausente, el analizador usa el valor predeterminado nativo de
  Archi: `'Write'`.

Para cualquier otro tipo de relación, `accessType` es `null`.

## Ejemplo

```ts
const access = model.relationships.filter(
  (r) => r.type === 'AccessRelationship',
);

for (const rel of access) {
  console.log(rel.sourceId, '->', rel.accessType, '->', rel.targetId);
}
```