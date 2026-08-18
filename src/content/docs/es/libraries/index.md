---
title: Librerías
description: El catálogo de librerías de CDA — paquetes que convierten modelos de arquitectura en artefactos de software tipados y procesables.
---

Las librerías de CDA son paquetes independientes con licencia MIT bajo el
ámbito npm `@cda`. Cada librería es fiel a un formato nativo primero, y luego
expone su semántica a través de una API pequeña y tipada.

## Modelo

Librerías que ingieren fuentes de modelos de arquitectura en estructuras de
CDA.

<div class="cda-library-grid">

<a class="cda-library-card" href="/es/libraries/archi-semantic-core/">
<h3>archi-semantic-core</h3>
<p>Analiza modelos nativos de Archi (.archimate) en estructuras semánticas tipadas.</p>
<span class="cda-library-meta">v0.4.2 · estable · MIT</span>
</a>

</div>

## Semántica

Librerías que modelan el significado de los conceptos de arquitectura y sus
relaciones.

*Nada publicado todavía.* La representación semántica de la librería actual
([ArchiModel](/es/libraries/archi-semantic-core/core-concepts/archi-model/))
es la base sobre la que se construirá esta capacidad.

## Transformación

Librerías que convierten entre representaciones y formatos de modelos.

*Nada publicado todavía.* Los transformadores de formatos de intercambio
están planificados como paquetes separados — consulte la
[hoja de ruta](/es/architecture/roadmap/).

## Validación

Librerías que comprueban modelos de arquitectura contra reglas.

*La validación estructural viaja dentro de archi-semantic-core hoy*
([validateArchiModel](/es/libraries/archi-semantic-core/getting-started/validate-model/)).
Las reglas de calidad sobre modelos analizados están planificadas.

## Herramientas

Herramientas para desarrolladores construidas sobre las estructuras de CDA.

*Nada publicado todavía.* Una puerta de validación CLI y el diff semántico
están planificados — consulte la [hoja de ruta](/es/architecture/roadmap/).
