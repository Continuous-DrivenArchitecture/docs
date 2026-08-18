---
title: Trabajo con modelos grandes
description: Colecciones planas, análisis en orden de origen y el pipeline de archivo de memoria constante.
---

La librería está diseñada para mantener predecibles la memoria y el tiempo a
medida que los modelos crecen. Nada de esto es API nueva — esta página
documenta las propiedades en las que puedes confiar.

## Colecciones planas, sin copias ocultas

Toda colección (`elements`, `relationships`, `diagramObjects`, …) es un
arreglo simple en orden de origen. No hay reconstrucción de árboles anidados
ni grafo de identidad de objetos: las referencias cruzadas son id de cadena
y los índices de contención precalculados en vistas/objetos se derivan en una
única pasada O(n) durante el análisis.

## `extractArchiModelXml` usa memoria constante

Para archivos zip `.archimate`, la entrada `model.xml` se transmite con
`inflateRawSync` **trozo a trozo** — la entrada completa nunca se mantiene en
memoria como datos comprimidos. La memoria máxima está dominada por el texto
XML *decodificado* en sí (el model.xml final), no por el archivo. Los
archivos XML planos omiten por completo la ruta del archivo.

Esto mantiene el costo de memoria del paso de archivo proporcional al tamaño
final del modelo, y el costo del paso de análisis proporcional al contenido
del modelo — los términos más grandes son inevitables, todo lo demás queda
fuera del camino.

## Una sola pasada sobre el XML

El análisis es una única pasada hacia delante con fast-xml-parser; la
validación del pool de id que realiza el analizador ocurre en esa misma
pasada, por lo que `validateArchiModel` es una *segunda* pasada lineal sobre
los arreglos ya analizados — la validación nunca provoca un re-análisis del
XML.

## Notas prácticas de escalado

- **Búsquedas**: evita `collection.find()` dentro de bucles sobre otras
  colecciones — O(n·m). Crea los índices `Map` una sola vez
  (consulta [Crear índices de búsqueda](/es/libraries/archi-semantic-core/guides/lookup-indexes/)).
- **Memoria**: el `ArchiModel` analizado refleja el documento XML; un modelo
  cuyo XML pesa N MB produce un modelo cuyas cadenas suman aproximadamente el
  mismo orden de magnitud, más la estructura por objeto. Para uso en informes
  o CI, eso está muy por debajo de los límites habituales.
- **Pruebas**: la prueba de consumo publicado ejercita el pipeline de archivo
  contra zips `.archimate` reales con imágenes incrustadas para mantener
  cubiertas ambas formas.

## Cuándo preocuparse

Casi nunca necesitas preocuparte. Si un modelo es tan grande que un único
`ArchiModel` analizado es un problema, el límite que estás tocando es la
representación en JS en sí — en ese punto la decisión correcta es una capa de
transmisión o indexada aguas abajo, no otro analizador.