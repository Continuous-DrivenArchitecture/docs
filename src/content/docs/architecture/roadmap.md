---
title: Roadmap
description: Where CDA is going — and where it is not.
---

## Current state

One library is published and stable:

- **`@cda/archi-semantic-core`** (v0.4.x) — faithful parsing of native Archi
  `.archimate` files (XML and zip archives), structural validation, label
  expression resolution. 156 tests, published with OIDC provenance.

The portal you are reading is the second deliverable: one site, one design,
one search for the whole ecosystem.

## Next steps

### 0.5 — Compatibility corpus

Grow the fixture corpus of real-world `.archimate` models saved by different
Archi versions, and pin behavior against it. Goal: documented compatibility
evidence behind the matrix on each library's pages.

### 0.6 — Hardening

- Browser bundling verification (esbuild/Vite) for the core entrypoint.
- Fuzz/edge-case passes on the parser.
- Performance benchmarks for large models.

### 0.7–0.9 — Consumers

Real consumers before 1.0:

- a CLI validation gate;
- a semantic diffing prototype;
- impact-analysis tooling.

### 1.0 — Contract stability

The public API contract (exported symbols and types) is frozen. Everything
after 1.0 is additive until the next major.

## What is deliberately NOT on the roadmap

- A modeling editor or renderer.
- A general graph database or query engine.
- Reimplementing architecture frameworks.
- Support for exchange formats inside the semantic core (transformers may
  arrive as separate packages).

## How to influence this

The roadmap is driven by consumers. Filing issues with real models, use
cases or constraints is the most valuable input — see
[Contributing](/contributing/).
