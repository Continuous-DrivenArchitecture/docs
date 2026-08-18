---
title: Changelog y releases
description: Dónde viven las notas de release y cómo se publican las versiones.
---

## El changelog

Cada release se documenta en el
[`CHANGELOG.md`](https://github.com/Continuous-DrivenArchitecture/archi-semantic-core/blob/develop/CHANGELOG.md)
del repositorio, generado a partir de Conventional Commits en el momento de la
publicación. No hay edición manual del changelog: lo que dice el mensaje de
commit es lo que dicen las notas de release.

## Versionado

Las versiones siguen el versionado semántico:

- commits `fix(...)` → releases de patch (`0.4.1`);
- commits `feat(...)` → releases de minor (`0.4.0`);
- `BREAKING CHANGE` → releases major (`1.0.0`).

## El pipeline de release

1. Los commits llegan a `develop` mediante PRs.
2. En el momento del release, `main` se actualiza **solo** mediante
   semantic-release — un workflow activado al hacer push a `main` ejecuta el
   job de release con un token npm emitido por OIDC, una protección de
   movimiento de rama y una comprobación de consumo publicado que instala el
   paquete recién publicado y ejercita el pipeline de archivos de extremo a
   extremo.

## npm

El paquete se publica en el registro npm como
[`@cda/archi-semantic-core`](https://www.npmjs.com/package/@cda/archi-semantic-core)
con atestación de procedencia (OIDC). La versión publicada más reciente
siempre es:

```sh
npm view @cda/archi-semantic-core version
```

## Releases de GitHub

Cada versión también produce un GitHub Release con las mismas notas,
etiquetado `v<version>`. La lista de releases:
[releases](https://github.com/Continuous-DrivenArchitecture/archi-semantic-core/releases).
