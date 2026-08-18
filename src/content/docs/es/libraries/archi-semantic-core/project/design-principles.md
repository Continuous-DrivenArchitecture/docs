---
title: Principios de diseño
description: Los principios de ingeniería que sustentan el paquete.
---

Estos principios rigen cada decisión del paquete. Si un cambio violara uno de
ellos, el cambio es incorrecto — aunque fuera conveniente.

## Fidelidad antes que conveniencia

El modelo debe representar lo que Archi almacena, no lo que a un consumidor le
resultaría conveniente. Esto significa:

- **Preservación literal** — `xsiType` conserva el valor original; los tipos
  de junction desconocidos conservan `rawJunctionType`; los strengths son
  texto libre; `connectionRouterType` permanece como número crudo porque
  interpretarlo sería adivinar la semántica de la interfaz de usuario.
- **Sin valores por defecto inventados** — excepto cuando los valores por
  defecto documentados del propio Archi son la verdad (`accessType` →
  `'Write'`, `directed` → `false`).
- **Los nulos son significativos** — un `strength` ausente significa "sin
  modificador establecido", no `''`; una coordenada ausente es `null`, no `0`.

## Una API pública pequeña, tipada y estable

- Dos puntos de entrada, cinco funciones y los tipos que necesitan — ese es
  todo el contrato.
- Cada adición a `src/index.ts`/`src/archive.ts` es una promesa pública:
  una vez publicada, se consume, se fija y solo se rompe en un límite de
  versión major.
- Los módulos internos no se exportan: `parseArchiModel` es la puerta; el
  resto de la casa es muro de carga.

## Los límites de plataforma son explícitos

- El punto de entrada principal tiene **cero imports de Node** para que los
  bundlers de navegador puedan consumirlo sin modificaciones.
- La funcionalidad solo-Node (manejo de zip) vive en `/archive` — importable
  únicamente cuando la plataforma la soporta.

## El consumidor es dueño de su carga de trabajo

El analizador devuelve arrays planos e ids de cadena. La construcción de
índices, el recorrido, el renderizado, el caché y el almacenamiento de grafos
son responsabilidad del consumidor — el paquete se mantiene al margen (véase
[IDs y referencias](/es/libraries/archi-semantic-core/core-concepts/ids-references/)).

## Validación sin divergencia

`validateArchiModel` nunca debe contradecir al analizador: valida el modelo
*analizado* con el mismo conjunto de ids que usó el analizador. Hay una única
fuente de verdad sobre la forma del modelo y ambas partes la leen.

## Probado contra la realidad

El comportamiento se fija contra el código fuente del propio Archi y fixtures
`.archimate` reales — incluidos archivos zip con imágenes incrustadas,
ejercitados por una prueba de consumo publicado. Cuando Archi cambió de
comportamiento (escape de Label Expressions en 4.4), el analizador sigue el
comportamiento, no una instantánea del código base.
