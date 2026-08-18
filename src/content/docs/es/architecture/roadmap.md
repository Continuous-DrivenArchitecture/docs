---
title: Hoja de ruta
description: Hacia dónde va CDA — y hacia dónde no.
---

## Estado actual

Una librería está publicada y es estable:

- **`@cda/archi-semantic-core`** (v0.4.x) — análisis fiel de archivos
  `.archimate` nativos de Archi (XML y archivos zip), validación estructural,
  resolución de expresiones de etiqueta. 156 pruebas, publicado con
  procedencia OIDC.

El portal que estás leyendo es el segundo entregable: un sitio, un diseño,
una búsqueda para todo el ecosistema.

## Próximos pasos

### 0.5 — Corpus de compatibilidad

Ampliar el corpus de fixtures con modelos `.archimate` del mundo real
guardados por diferentes versiones de Archi y fijar el comportamiento frente
a él. Objetivo: evidencia de compatibilidad documentada detrás de la matriz
de cada página de librería.

### 0.6 — Endurecimiento

- Verificación de empaquetado en navegador (esbuild/Vite) para el entrypoint
  principal.
- Pasadas de fuzzing/casos límite sobre el parser.
- Benchmarks de rendimiento para modelos grandes.

### 0.7–0.9 — Consumidores

Consumidores reales antes de 1.0:

- una compuerta de validación CLI;
- un prototipo de diffing semántico;
- herramientas de análisis de impacto.

### 1.0 — Estabilidad del contrato

El contrato de la API pública (símbolos y tipos exportados) queda congelado.
Todo lo posterior a 1.0 es aditivo hasta el próximo major.

## Lo que deliberadamente NO está en la hoja de ruta

- Un editor o renderizador de modelos.
- Una base de datos de grafos o un motor de consultas general.
- Reimplementar frameworks de arquitectura.
- Soporte para formatos de intercambio dentro del núcleo semántico (los
  transformadores pueden llegar como paquetes separados).

## Cómo influir en esto

La hoja de ruta la impulsan los consumidores. Abrir issues con modelos
reales, casos de uso o restricciones es la aportación más valiosa — consulta
[Contribuir](/es/contributing/).
