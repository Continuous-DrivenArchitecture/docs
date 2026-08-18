---
title: El ecosistema
description: El catálogo de paquetes CDA — librerías actuales y la dirección del ecosistema.
---

CDA está organizado como paquetes independientes bajo el scope de npm `@cda`,
cada uno con su propio repositorio, pipeline de publicación y versionado
semántico. Este portal los documenta todos.

## Librerías

### `@cda/archi-semantic-core` — estable

La librería fundacional. Analiza archivos de modelo `.archimate` nativos de
Archi y los convierte en un `ArchiModel` fiel y tipado.

- Repositorio: [Continuous-DrivenArchitecture/archi-semantic-core](https://github.com/Continuous-DrivenArchitecture/archi-semantic-core)
- npm: [@cda/archi-semantic-core](https://www.npmjs.com/package/@cda/archi-semantic-core)
- Documentación: [libraries/archi-semantic-core](/es/libraries/archi-semantic-core/getting-started/introduction/)

## Planificado

El ecosistema crecerá sobre la misma base, siempre leyendo primero los
formatos nativos:

- **Herramientas CLI** — compuertas de validación e informes para modelos
  en CI.
- **Diffing** — diffs semánticos entre versiones de modelos.
- **Reglas de calidad** — reglas de gobernanza sobre modelos analizados.
- **Transformadores de formatos de intercambio** — convertidores entre
  formatos nativos y estandarizados (como capas separadas, nunca dentro del
  núcleo semántico).

Cada librería seguirá las mismas reglas:

- **análisis fiel del formato nativo** — sin reinterpretación con pérdida;
- **API pública tipada** — pequeña y estable;
- **límites documentados** — honesta sobre lo que no hace;
- **publicada con procedencia** — releases de npm firmados con OIDC.

## Cómo se relacionan las librerías

Las librerías son independientes pero componibles: cada una consume el
resultado de la anterior. El núcleo semántico es la única capa de dependencia
permanente — todo lo demás se construye sobre los modelos analizados.

```text
archi-semantic-core  →  CLI / diffing / quality rules  →  transformers
```

## Política de versionado

- `fix(...)` → patch, `feat(...)` → minor, cambios incompatibles → major.
- Los cambios en la API pública de una librería se documentan en su changelog
  y en su sección de este portal.
- La referencia de API de este portal se genera a partir del **paquete npm
  publicado** — lo que ves es exactamente lo que instalas.
