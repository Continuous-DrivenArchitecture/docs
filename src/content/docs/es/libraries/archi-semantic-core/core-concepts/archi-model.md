---
title: ArchiModel
description: La forma del modelo semántico analizado.
---

`parseArchiModel` devuelve un
[`ArchiModel`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiModel/) — la
representación semántica de un archivo de modelo `.archimate` de Archi.

```text
.archimate XML

        ↓ parse

ArchiModel
│
├── metadata        ← id, name, native version, purpose, model-level properties
├── folders
├── elements
├── relationships
├── views
├── diagramObjects
├── diagramConnections
├── notes
└── profiles        ← Specializations and generic Profiles
```

## Colecciones

Cada colección es **plana** (no anidada) y **preserva el orden en que las
entidades aparecen en el XML fuente**. Las referencias cruzadas entre
entidades (el `sourceId` de una relación, el `archimateElementId` de un
objeto de diagrama) son ids de cadena simples — búsquelos en el array
correspondiente o construya un `Map` con clave `id` si necesita búsquedas
repetidas.

El analizador nunca exige que una entidad específica aparezca antes que otra:
para cuando el modelo se devuelve, las referencias son solo cadenas a la
espera de que quien llama las resuelva.

## Metadatos

[`ArchiModelMetadata`](/es/libraries/archi-semantic-core/reference/generated/interfaces/ArchiModelMetadata/)
contiene los atributos a nivel de modelo:

| Campo | Descripción |
| --- | --- |
| `id` | El id propio del modelo. |
| `name` | El nombre del modelo. |
| `version` | La cadena de versión nativa del modelo. |
| `purpose` | El elemento nativo `<purpose>` — el nombre que Archi da al campo narrativo a nivel de modelo. `null` cuando está ausente. |
| `properties` | Entradas `<property>` a nivel de modelo. |

Tenga en cuenta que la raíz del modelo no tiene un concepto genérico separado
de "documentación" — su narrativa vive en `purpose`, a diferencia de
elementos, relaciones, vistas y carpetas, que todos llevan un campo
`documentation`.

## Colecciones de un vistazo

| Colección | Qué contiene | Referencias cruzadas que encontrará |
| --- | --- | --- |
| `folders` | El árbol del modelo: contenedores estándar (Business, Application, Relations, Views) más subcarpetas de usuario. | `parentId`, `containedIds` |
| `elements` | Cada elemento semántico, cualquier tipo ArchiMate. | `folderId`, `profiles` |
| `relationships` | Cada relación semántica. | `sourceId`, `targetId`, `folderId`, `profiles` |
| `views` | Definiciones de diagrama/vista. | `folderId`, `diagramObjectIds`, `diagramConnectionIds`, `noteIds` |
| `diagramObjects` | Nodos visuales (objetos de diagrama, grupos, referencias a modelos). | `viewId`, `parentId`, `archimateElementId`, `referencedModelId` |
| `diagramConnections` | Conexiones visuales. | `viewId`, `sourceId`, `targetId`, `archimateRelationshipId` |
| `notes` | Notas de diagrama de texto libre. | `viewId`, `parentId` |
| `profiles` | Especializaciones y Perfiles genéricos. | referenciados desde `elements[].profiles`, `relationships[].profiles` |

## El conjunto de ids

Archi extrae todos los ids — semánticos y visuales — de **un único conjunto
compartido**, de modo que un `duplicate-id` en cualquier parte del modelo es
un problema real de integridad. El validador se aprovecha exactamente de este
hecho; consulte [Validar un modelo](/es/libraries/archi-semantic-core/getting-started/validate-model/).

## Garantía de orden

Todas las colecciones preservan el orden de origen. Si sus herramientas
dependen del orden del documento (por ejemplo para reflejar el árbol del
modelo), lo tiene de forma gratuita — nada se ordena ni se reorganiza durante
el análisis.