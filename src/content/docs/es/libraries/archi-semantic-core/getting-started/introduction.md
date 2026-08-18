---
title: Introducción
description: Qué es archi-semantic-core, qué no es y dónde encaja en el ecosistema CDA.
---

`archi-semantic-core` es una librería TypeScript que analiza **archivos de
modelo `.archimate` nativos** creados por el editor de escritorio
[Archi](https://www.archimatetool.com/) y expone su semántica a través de un
pequeño `ArchiModel` tipado.

```text
.archimate XML  →  archi-semantic-core  →  ArchiModel
```

La librería lee el formato XML nativo de Archi (`xmlns:archimate="http://www.archimatetool.com/archimate"` —
el formato que el propio Archi lee y escribe en disco) y lo convierte en un
modelo limpio y bien tipado que contiene:

- carpetas, elementos y relaciones;
- vistas, objetos de diagrama, conexiones de diagrama y notas;
- documentación, propiedades, estilo visual y geometría;
- Especializaciones y Perfiles genéricos;
- los detalles semánticos nativos — Uniones (Junctions), atributos de
  Acceso/Influencia/Asociación, Expresiones de Etiqueta (Label Expressions) —
  necesarios para trabajar con un modelo sin comprender la estructura XML de
  Archi;
- la variante de archivo zip del formato `.archimate`, a través del subpath
  `/archive` solo para Node.

## Para qué sirve

Use este paquete cuando necesite trabajar programáticamente con un modelo de
Archi manteniendo el análisis independiente del renderizado, la edición, las
reglas de calidad o la conversión de formatos de intercambio.

El analizador se centra en dos responsabilidades:

- **preservar la información nativa de Archi** que pertenece al modelo
  semántico;
- **exponer esa información** a través de una API TypeScript pequeña y
  tipada.

No reinterpreta el modelo según otro estándar.

## Qué no es

Este paquete **no** es:

- un analizador o generador del
  [Formato de Archivo de Intercambio de Modelos ArchiMate®](https://www.opengroup.org/xsd/archimate/);
- un editor ni un marco de mutación;
- un renderizador, motor de maquetación o motor de enrutado de diagramas;
- un linter de calidad de arquitectura;
- un motor de consultas general ni una base de datos de grafos;
- un serializador de vuelta a `.archimate`.

Esas son preocupaciones separadas y pertenecen a paquetes separados. La página
[Limitaciones conocidas](/es/libraries/archi-semantic-core/compatibility/known-limitations/) enumera el
límite completo.

## Dónde encaja

`archi-semantic-core` es la primera piedra angular del ecosistema
Continuous-Driven Architecture (CDA): una representación semántica fiel y
tipada de cómo se construye un diseño en el editor Archi. Las herramientas
descendentes consumen esa representación para análisis de impacto, detección
de desviaciones y evolución de la arquitectura — capas que pueden construir un
grafo navegable encima, en lugar de que este paquete intente ser uno por sí
mismo.

:::caution[No afiliado con Archi]

Este proyecto no está afiliado ni respaldado por Archi, el proyecto Archi Tool
ni The Open Group.

:::

## Siguientes pasos

- [Instalación](/es/libraries/archi-semantic-core/getting-started/installation/) — requisitos e instalación.
- [Analice su primer modelo](/es/libraries/archi-semantic-core/getting-started/parse-first-model/) — un ejemplo mínimo de principio a fin.
- [ArchiModel](/es/libraries/archi-semantic-core/core-concepts/archi-model/) — lo que contiene el modelo analizado.