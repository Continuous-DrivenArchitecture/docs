---
title: Validar un modelo
description: Validación estructural de un ArchiModel con validateArchiModel.
---

`validateArchiModel` comprueba la **integridad estructural** de un modelo ya
analizado — identificadores faltantes/duplicados y referencias cruzadas
colgantes.

```ts
import { parseArchiModel, validateArchiModel } from '@cda/archi-semantic-core';

const model = parseArchiModel(xml);
const result = validateArchiModel(model);

console.log(result.valid); // boolean
for (const issue of result.errors) {
  console.log(issue.code, issue.message, issue.path);
}
```

## Qué comprueba

El validador construye un conjunto global de ids que abarca las siete
colecciones con ids (carpetas, elementos, relaciones, vistas, objetos de
diagrama, conexiones de diagrama, notas — Archi extrae todos los ids,
semánticos y visuales, de un único conjunto compartido) y luego comprueba:

| Código | Se dispara cuando |
| --- | --- |
| `missing-id` | Una entrada no tiene ningún `id`. |
| `duplicate-id` | El mismo `id` aparece en más de una entrada, en cualquier parte del modelo. |
| `broken-relationship-source` | El `sourceId` de una relación no se resuelve a ningún id conocido. |
| `broken-relationship-target` | El `targetId` de una relación no se resuelve a ningún id conocido. |
| `unrecognized-junction-type` | El atributo nativo `type` de un elemento `Junction` no es `""`/está ausente (And) ni `"or"` (Or). |
| `broken-diagram-object-element` | El `archimateElementId` de un objeto de diagrama no se resuelve a ningún id conocido. |
| `broken-diagram-object-model-reference` | El `referencedModelId` de un `DiagramModelReference` no se resuelve a ningún id conocido. |
| `broken-diagram-connection-relationship` | El `archimateRelationshipId` de una conexión no se resuelve a ningún id conocido. |
| `broken-diagram-connection-source` | El `sourceId` de una conexión no se resuelve a ningún id conocido. |
| `broken-diagram-connection-target` | El `targetId` de una conexión no se resuelve a ningún id conocido. |

## Estructura de los problemas

Cada [`ArchiValidationIssue`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiValidationIssue/)
lleva un localizador `path` hacia el `ArchiModel` devuelto — no el XML
original — de modo que un fallo puede rastrearse directamente hasta el campo
que falló:

```text
"relationships[rel-1].sourceId"
"diagramConnections[conn-7].targetId"
```

## Qué significa `{ valid: true }`

`{ valid: true, errors: [] }` significa que toda entrada con id tiene un id
único no vacío y que toda referencia cruzada que este validador comprueba se
resuelve. No comprueba:

- la integridad de `ArchiBounds`;
- las referencias de `ArchiProfile`/`profiles`;
- nada relacionado con estilos o características.

## Qué no es

Este validador **no** es un linter de calidad de arquitectura empresarial. Un
modelo puede ser estructuralmente válido y aun así representar una mala
arquitectura. Las reglas de calidad pertenecen a una capa separada (por
ejemplo, una herramienta de gobernanza construida sobre `ArchiModel`), no al
núcleo semántico. El validador tampoco evalúa las expresiones de etiqueta —
la resolución es una preocupación del renderizado, no de la integridad.

## En CI

El validador es una puerta natural del pipeline: ejecútelo en un hook de
pre-commit o en un paso de CI y deje que el código de salida bloquee las
fusiones. Consulte
[Validación estructural en CI](/es/libraries/archi-semantic-core/guides/validation-in-ci/) para una
receta completa con informes legibles por humanos.