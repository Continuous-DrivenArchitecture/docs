---
title: Limitaciones conocidas
description: Límites honestos — qué no puede hacer todavía este paquete o qué nunca hará.
---

Esta página es la cláusula de honestidad del contrato: cada entrada es un
límite real y conocido. Si una capacidad no aparece aquí, tampoco está en el
paquete.

## No analizado o no resuelto

- **Formas con prefijo de referencia de Label Expression** — `${parent{...}}`,
  `${source{...}}`, `${model{...}}`, `${<relationship>:source{...}}` y
  similares se dejan **literales, sin resolver** en la salida de
  `resolveLabelExpression`: requieren un recorrido del grafo del modelo más
  allá de un único objeto.
- **Los placeholders `${specialization}` y `${viewpoint}`** — igualmente se
  dejan sin resolver; el analizador aún no captura esos atributos en los
  objetos visuales.
- **Archivos ArchiMate Model Exchange** — por diseño, nunca se analizan ni se
  generan (véase [Filosofía de compatibilidad](/es/libraries/archi-semantic-core/compatibility/philosophy/)).
- **Semántica de Sketch/Canvas** — preservada literalmente donde aparece,
  pero sin tratamiento semántico (no hay semántica de elemento/relación que
  ofrecer).
- **Binarios de imagen** — nunca se extraen; las referencias de estilo
  `imagePath` se exponen como punteros al archivo.

## No disponible

- **Mutación o serialización** — no hay forma de escribir un `ArchiModel`
  de vuelta a `.archimate`, ni API de edición. El paquete lee; los
  consumidores construyen la vía de escritura si la necesitan.
- **Renderizado, diseño, enrutado de diagramas, renderizado de imágenes** —
  fuera de alcance por diseño.
- **Reglas de calidad** — `validateArchiModel` solo comprueba la integridad
  estructural. Las reglas de estilo lint son una capa aparte.
- **Manejo de zip en navegador** — la subruta `/archive` es solo Node
  (`node:zlib`); la entrada raíz no tiene imports de Node y sigue siendo
  segura para bundlers.
- **Utilidades de búsqueda por id, lenguaje de consulta, almacenamiento de
  grafos** — arrays planos + ids de cadena + tus propios índices. Sin
  utilidades, sin DSL, sin base de datos de grafos.

## Aún no verificado contra

- Un corpus amplio de modelos de terceros guardados por distintas versiones de
  Archi. El analizador está escrito contra el código fuente de Archi y los
  fixtures de prueba del propio proyecto; se planea una validación más amplia.
  Si tu modelo encuentra un caso límite, un informe de issue con el
  `.archimate` (o una reproducción mínima) es la contribución más valiosa que
  puedes hacer.

## Nunca se adivina

- Los valores nativos desconocidos nunca se adivinan ni se descartan
  (véase [Junctions](/es/libraries/archi-semantic-core/semantics/junctions/) para ver la regla en acción).
- El analizador no fabrica valores por defecto que Archi no almacena — excepto
  cuando los valores por defecto nativos del propio Archi están documentados
  (`accessType` `'Write'`, `directed` `false`).
