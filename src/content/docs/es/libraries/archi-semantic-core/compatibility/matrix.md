---
title: Matriz de compatibilidad
description: Qué se analiza, qué se preserva literalmente y qué se valida, por área.
---

Esta matriz resume cómo se maneja cada área del formato nativo `.archimate`.
"Analizado" significa representado en `ArchiModel`; "Preservado literalmente"
significa transferido sin transformación; "Comprobado" significa que
`validateArchiModel` informa de violaciones.

## Estructura del modelo

| Área | Estado |
| --- | --- |
| Raíz del modelo (`metadata`, `purpose`, propiedades) | Analizado |
| Árbol de carpetas | Analizado con `parentId`/`containedIds` |
| Elementos, de cualquier tipo | Analizados genéricamente, `xsiType` preservado literalmente |
| Relaciones, de cualquier tipo | Analizadas genéricamente, `xsiType` preservado literalmente |
| Vistas (`ArchiView`) | Analizadas con índices de contención precalculados |
| Notas | Analizadas |
| Referencias a elementos / modelos del modelo | Analizadas (`DiagramModelReference.referencedModelId`) |
| Modelos Sketch/Canvas | Preservados literalmente donde aparecen |
| Ids duplicados/faltantes | Comprobados (`missing-id`, `duplicate-id`) |
| Extremos de relación colgantes | Comprobados (`broken-relationship-source/target`) |
| Referencias visuales colgantes | Comprobadas (referentes de objeto/conexión) |

## Semántica nativa de Archi

| Área | Estado |
| --- | --- |
| Junction AND/OR (atributo `type`) | Analizada + comprobada (`unrecognized-junction-type`) |
| Access `accessType` (0–3) | Decodificado a `ArchiAccessType`, valor nativo por defecto `'Write'` |
| Influence `strength` (texto libre) | Analizado literalmente |
| Association `directed` | Decodificado a booleano, valor nativo por defecto `false` |
| Profiles / Specializations | Analizados (id, name, imagePath, features) |
| Label Expressions | Leídas + resueltas (placeholders básicos); las formas con prefijo de referencia se dejan literales |
| Eliminación de espacio de nombres en `xsiType` | Aplicada; el valor crudo siempre se preserva |

## Estilo y geometría

| Área | Estado |
| --- | --- |
| `ArchiStyle` (línea/relleno/fuente) | Analizado, campos independientes y a prueba de nulos |
| `ArchiBounds` | Analizado; las coordenadas anidadas son relativas al padre |
| Bendpoints | Analizados con pares inicio/fin nativos |
| Integridad de la geometría | No comprobada (los nulos son significativos) |

## Archivos

| Área | Estado |
| --- | --- |
| `.archimate` XML plano | Soportado |
| `.archimate` zip (`model.xml` + `images/`) | Soportado (subruta solo Node) |
| Compresión Stored/Deflate | Soportada; cualquier otra lanza un error |
| Integridad CRC-32 | Verificada |
| Extracción de imágenes incrustadas | No disponible (se exponen punteros, p. ej. `imagePath`) |

## Límites

| Área | Estado |
| --- | --- |
| Formato de archivo ArchiMate Model Exchange | No analizado, no generado |
| Mutación / serialización de vuelta a `.archimate` | No disponible |
| Renderizado, diseño, enrutado | No disponible |
| Reglas de calidad/lint | No disponibles |
| Manejo de zip en navegador | No disponible (la entrada raíz sigue siendo segura para bundlers) |

Las columnas son deliberadamente exactas: un campo "preservado literalmente" es
un campo que este paquete promete no reinterpretar nunca, y un límite listado
arriba es un límite que el paquete promete no cruzar silenciosamente.
