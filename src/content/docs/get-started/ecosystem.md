---
title: The ecosystem
description: The CDA package catalog — current libraries and the direction of the ecosystem.
---

CDA is organized as independent packages under the `@cda` npm scope, each
with its own repository, release pipeline and semantic versioning. This
portal documents all of them.

## Libraries

### `@cda/archi-semantic-core` — stable

The foundational library. Parses native Archi `.archimate` model files into
a faithful, typed `ArchiModel`.

- Repository: [Continuous-DrivenArchitecture/archi-semantic-core](https://github.com/Continuous-DrivenArchitecture/archi-semantic-core)
- npm: [@cda/archi-semantic-core](https://www.npmjs.com/package/@cda/archi-semantic-core)
- Documentation: [libraries/archi-semantic-core](/libraries/archi-semantic-core/getting-started/introduction/)

## Planned

The ecosystem will grow around the same foundation, always reading native
formats first:

- **CLI tooling** — validation gates and reporting for models in CI.
- **Diffing** — semantic diffs between model versions.
- **Quality rules** — governance rules over parsed models.
- **Exchange-format transformers** — converters between native formats and
  standardized ones (as separate layers, never inside the semantic core).

Each library will follow the same rules:

- **faithful parsing of the native format** — no lossy reinterpretation;
- **typed public API** — small and stable;
- **documented boundaries** — honest about what it does not do;
- **published with provenance** — OIDC-signed npm releases.

## How libraries relate

Libraries are independent but composable: each consumes the output of the
previous one. The semantic core is the only permanent dependency layer —
everything else builds on top of parsed models.

```text
archi-semantic-core  →  CLI / diffing / quality rules  →  transformers
```

## Versioning policy

- `fix(...)` → patch, `feat(...)` → minor, breaking changes → major.
- A library's public API changes are documented in its changelog and its
  section of this portal.
- The API reference on this portal is generated from the **published npm
  package** — what you see is exactly what you install.
