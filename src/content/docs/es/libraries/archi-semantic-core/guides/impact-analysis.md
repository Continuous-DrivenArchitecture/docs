---
title: Análisis de impacto
description: Recorrer las relaciones en ambas direcciones para encontrar qué depende de un elemento determinado.
---

El análisis de impacto es un recorrido de grafo dirigido sobre las relaciones
del modelo: "¿a quién afecta si este elemento cambia?" se responde recorriendo
las relaciones *entrantes* al elemento y luego de forma recursiva.

```ts
import {
  parseArchiModel,
  validateArchiModel,
} from '@cda/archi-semantic-core';

const model = parseArchiModel(xml);
const { valid, errors } = validateArchiModel(model);
if (!valid) {
  console.error('Model is not structurally sound; traversal may mislead.');
  console.error(errors);
}

const elementById = new Map(model.elements.map((e) => [e.id, e]));

// relationships BY source and BY target — two O(1) neighbor indexes
const outgoingBySource = new Map<string, typeof model.relationships>();
for (const rel of model.relationships) {
  const bucket = outgoingBySource.get(rel.sourceId) ?? [];
  bucket.push(rel);
  outgoingBySource.set(rel.sourceId, bucket);
}

const incomingByTarget = new Map<string, typeof model.relationships>();
for (const rel of model.relationships) {
  const bucket = incomingByTarget.get(rel.targetId) ?? [];
  bucket.push(rel);
  incomingByTarget.set(rel.targetId, bucket);
}
```

## Recorrer los dependientes descendentes

```ts
function collectDependents(
  startId: string,
  depthLimit: number,
): Map<string, number> {
  const depths = new Map<string, number>([[startId, 0]]);
  const queue = [startId];

  while (queue.length > 0) {
    const id = queue.shift()!;
    const depth = depths.get(id)!;
    if (depth >= depthLimit) continue;

    for (const rel of incomingByTarget.get(id) ?? []) {
      if (!depths.has(rel.sourceId)) {
        depths.set(rel.sourceId, depth + 1);
        queue.push(rel.sourceId);
      }
    }
  }

  return depths;
}
```

El resultado asigna los id de los elementos afectados a su distancia respecto
al elemento cambiado. Ordenar por `(depth, name)` produce un informe listo
para revisar:

```ts
const affected = collectDependents('element-paying-service', 5);
const report = [...affected]
  .filter(([id]) => id !== 'element-paying-service')
  .sort(([aId, aDepth], [bId, bDepth]) =>
    aDepth - bDepth ||
    (elementById.get(aId)?.name ?? '').localeCompare(elementById.get(bId)?.name ?? ''),
  )
  .map(([id, depth]) => `${'  '.repeat(depth)}${elementById.get(id)?.name}`)
  .join('\n');

console.log(report);
```

## Detalles importantes del recorrido

- **Las relaciones pueden ser origen o destino de otras relaciones.** Al
  recopilar dependientes, resuelve `rel.sourceId` desde las colecciones de
  elementos y de relaciones — un elemento cambiado puede afectar primero a
  otras relaciones (consulta [Relaciones](/es/libraries/archi-semantic-core/core-concepts/relationships/)).
- **Valida antes de confiar en el recorrido.** Un `sourceId`/`targetId`
  colgante elimina silenciosamente un borde del recorrido;
  `validateArchiModel` saca a la luz exactamente esas condiciones. Usa los
  resultados de los índices de dependencias anteriores para detectarlos de
  antemano: una relación cuyos extremos no se pueden resolver es en sí misma
  un hallazgo que vale la pena informar.

## Simetría ascendente / descendente

Intercambiar los dos índices (recorrer `outgoingBySource` desde un destino)
responde a la pregunta ascendente: "¿de qué depende este elemento?" — el
mismo recorrido, otra dirección.