---
title: Arquitectura del ecosistema
description: Cómo está estructurado el ecosistema CDA — repositorios, contratos y la regla de la verdad de la API.
---

## Repositorios

Cada paquete CDA vive en su propio repositorio. El portal también es un
repositorio separado:

```text
Continuous-DrivenArchitecture/
├── archi-semantic-core/        # library: source, tests, examples, JSDoc
├── <future-library-a>/         # library: source, tests, examples, JSDoc
└── developer-portal/           # this site: Astro + Starlight + GitHub Pages
```

Un repositorio de librería guarda todo lo necesario para construir y publicar
el paquete: fuente, pruebas, ejemplos, README, CHANGELOG, CONTRIBUTING. El
portal guarda todo lo necesario para explicar el ecosistema: documentación
conceptual, guías, documentación detallada por librería, la referencia de API
y la navegación y búsqueda globales.

## La regla de la verdad de la API

> **La documentación conceptual puede vivir en el portal; la verdad del
> contrato de API vive junto al código.**

El JSDoc/TSDoc de cada librería es la fuente de verdad de su API pública. El
portal genera la referencia de API de cada librería a partir del **paquete npm
publicado** durante el CI:

```text
@cda/<library> published to npm
        │
        │ TypeDoc, against node_modules in the portal build
        ▼
src/content/docs/libraries/<library>/reference/generated/
```

Nada se copia a mano. Cuando una librería publica una nueva versión, el portal
actualiza la dependencia fijada y la referencia la sigue.

## Publicaciones

Cada librería sigue el mismo pipeline:

1. Los commits llegan a `develop` mediante pull requests.
2. `main` solo se actualiza con semantic-release.
3. Los releases se publican en npm con procedencia OIDC.
4. La dependencia fijada del portal se actualiza a la nueva versión
   (actualmente un paso manual; la automatización está planificada).

## La compilación del portal

El portal es un sitio estático:

- **Framework**: Astro + Starlight (MDX, preparado para i18n, búsqueda
  local).
- **Diseño**: el sistema de diseño CDA (`src/styles/cda.css`).
- **Despliegue**: GitHub Pages, compilado y desplegado por el workflow
  `docs.yml`.
- **Referencia de API**: generada en tiempo de compilación a partir de los
  paquetes instalados — nunca se confirma, siempre actualizada.

## Límites

- El portal nunca bifurca ni incluye el código fuente de las librerías.
- La documentación de una librería vive en el portal solo como **contenido
  conceptual**; la verdad de la API permanece en el repositorio de la
  librería.
- Las librerías nunca dependen del portal.
