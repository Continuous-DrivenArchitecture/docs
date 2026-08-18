---
title: Contribuir
description: Cómo contribuir al ecosistema CDA y al portal para desarrolladores.
---

Se aceptan contribuciones en todo el ecosistema.

## Dónde contribuir

- **Una librería** (p. ej. `archi-semantic-core`): informes de errores con
  reproducciones mínimas `.archimate`, fixtures, mejoras de JSDoc, pruebas.
  Sigue el propio archivo CONTRIBUTING de ese repositorio — cada librería
  documenta sus convenciones, flujo de ramas y pipeline de publicación.
- **Este portal**: documentación, guías, tutoriales, correcciones al sistema
  de diseño. El contenido está en `src/content/docs/`; la referencia de API
  se genera automáticamente y nunca se edita a mano.
- **Diseño**: el sistema de diseño CDA (`src/styles/cda.css`) y la identidad
  visual.

## Las reglas que importan en todas partes

1. **La fidelidad primero.** Nunca "arregles" la documentación para hacer que
   la librería parezca mejor de lo que es — documenta los límites con
   honestidad.
2. **La verdad de la API vive en el código.** Si la API cambió, la corrección
   pertenece al JSDoc de la librería, no al texto del portal.
3. **Conventional Commits.** Las librerías publican automáticamente; los
   mensajes de commit se convierten en changelogs.

## Trabajar en el portal

```sh
git clone https://github.com/Continuous-DrivenArchitecture/developer-portal
cd developer-portal
npm ci
npm run dev
```

- `npm run gen:api` regenera la referencia de API a partir de los paquetes
  instalados (fija la versión en `package.json`).
- `npm run build` valida la compilación estática completa, incluido el índice
  de búsqueda.
- El sitio se despliega desde `main`; propón los cambios mediante pull
  requests.

## Escribir documentación

Las páginas nuevas van en `src/content/docs/` con un frontmatter corto
(`title`, `description`). La barra lateral de `astro.config.mjs` lista cada
página explícitamente — añade la tuya también.

No dupliques: si el portal ya explica un concepto (por ejemplo la fidelidad
al formato nativo), enlázalo en lugar de volver a explicarlo.

## Licencia

Todos los repositorios son MIT. Al contribuir, aceptas licenciar tus
contribuciones bajo la licencia del proyecto.
