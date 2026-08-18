---
title: Filosofía de compatibilidad
description: Por qué este paquete lee el formato nativo de Archi y no un formato de intercambio estandarizado.
---

`archi-semantic-core` analiza **el XML `.archimate` nativo de Archi**, el formato
que el propio Archi lee y escribe en disco — no el ArchiMate® Model Exchange
File Format. Esa elección es deliberada y merece una explicación explícita.

## Semántica fiel antes que estándares

El propósito de este paquete es una **representación semántica fiel y tipada
del modelo tal como Archi lo almacena realmente**. La semántica nativa de
Archi — nombres de tipo crudos frente a semánticos, el atributo `type` de las
Junction, los códigos `0`–`3` de Access, el `strength` de texto libre de
Influence, las Label Expressions, la geometría relativa anidada, las
Specializations — forma parte de los datos, no es un obstáculo.

Un formato de intercambio (Open Exchange, variantes `.xml`) existe para
*interoperar entre herramientas* y, al hacerlo, normaliza: `AccessTypeEnum`
usa `"Access"` donde Archi usa `"Unspecified"`; las Label Expressions se
descartan o se pierden; las Specializations y los Profiles no tienen
equivalente; las coordenadas relativas anidadas no existen. Un analizador de
un formato de intercambio **debe** descartar esa información o reinterpretarla.
Este paquete se construyó para *no* hacer ninguna de las dos cosas.

Si necesitas compatibilidad con Open Exchange, la arquitectura correcta es una
capa de transformación sobre `ArchiModel` — que lea la salida de este paquete
y emita el formato de intercambio —, no un fork que analice XML de
intercambio.

## Peculiaridades de Archi original, preservadas

El analizador está escrito contra el código fuente y los modelos de prueba del
propio Archi, no contra una especificación. Cuando el formato es ambiguo, gana
el comportamiento de Archi. Cuando Archi introdujo un cambio incompatible
(escape de Label Expressions en Archi 4.4), el analizador sigue el
*comportamiento*, de modo que los modelos antiguos y nuevos se resuelven al
mismo texto.

## Objetivos de compatibilidad

- **Compatibilidad hacia delante con las versiones de Archi** — un modelo
  guardado por una versión más reciente de Archi con tipos de elemento o
  atributos de relación antes desconocidos se sigue analizando; nada se
  rechaza porque un nombre no estuviera en un catálogo codificado.
- **Exactitud** — los valores nativos desconocidos nunca se adivinan (véase
  [Junctions](/es/libraries/archi-semantic-core/semantics/junctions/) para el ejemplo más claro).
- **Honestidad** — los límites y las limitaciones se documentan en
  [Limitaciones conocidas](/es/libraries/archi-semantic-core/compatibility/known-limitations/).
