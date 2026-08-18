---
title: ¿Qué es CDA?
description: Continuous-Driven Architecture — arquitectura como artefactos de software estructurados y procesables.
---

**Continuous-Driven Architecture (CDA)** es un ecosistema de código abierto de
librerías y herramientas para desarrolladores construido en torno a una idea:

> Arquitectura que el software puede entender.

Los modelos de arquitectura de hoy viven dentro de editores de escritorio.
Son intención de diseño rica y fiel — pero en gran medida opacos para el
software: formatos cerrados, flujos de trabajo centrados en humanos, sin CI,
sin diffs, sin automatización.

CDA trata la arquitectura como **datos estructurados**: versionados como
código fuente, validados en pipelines, consumibles por herramientas. El primer
paso en esa dirección es leer los modelos que los arquitectos realmente
producen — de forma nativa, fiel, sin reinterpretación con pérdida — y
exponerlos mediante APIs pequeñas y tipadas.

## Lo que CDA no es

- No es una nueva metodología de arquitectura — los frameworks y herramientas
  existentes (como Archi y ArchiMate®) siguen siendo la fuente de verdad para
  el modelado.
- No es un reemplazo de las herramientas de modelado — CDA consume su
  resultado.
- No es una plataforma monolítica única — es un conjunto de paquetes
  independientes.

## El principio fundamental

> **Fidelidad antes que conveniencia.** Un modelo significa lo que la
> herramienta de modelado almacenó, no lo que a un consumidor le resultaría
> conveniente. Cada paquete CDA preserva la semántica nativa y documenta sus
> límites con honestidad — incluido lo que no hace.

## Dónde encaja

```text
architects model (Archi, ArchiMate®)
        │
        ▼
native model files (.archimate, …)
        │
        ▼
CDA libraries (typed, faithful parsing)
        │
        ▼
CI pipelines · governance · tooling · GitOps
```

## Próximos pasos

- [El ecosistema](/es/get-started/ecosystem/) — los paquetes actuales y
  planificados.
- [Primeros pasos](/es/get-started/first-steps/) — un ejemplo completo de
  principio a fin.
