---
title: Libraries
description: The CDA library catalog — packages that turn architecture models into typed, processable software artifacts.
---

CDA libraries are independent, MIT-licensed packages under the `@cda` npm
scope. Each library is faithful to a native format first, then exposes its
semantics through a small typed API.

## Model

Libraries that ingest architecture model sources into CDA structures.

<div class="cda-library-grid">

<a class="cda-library-card" href="/libraries/archi-semantic-core/">
<h3>archi-semantic-core</h3>
<p>Parse native Archi .archimate models into typed semantic structures.</p>
<span class="cda-library-meta">v0.4.2 · stable · MIT</span>
</a>

</div>

## Semantics

Libraries that model the meaning of architecture concepts and their
relationships.

*Nothing published yet.* The semantic representation of the current library
([ArchiModel](/libraries/archi-semantic-core/core-concepts/archi-model/)) is
the foundation this capability will build on.

## Transform

Libraries that convert between model representations and formats.

*Nothing published yet.* Exchange-format transformers are planned as
separate packages — see the [roadmap](/architecture/roadmap/).

## Validate

Libraries that check architecture models against rules.

*Structural validation ships inside archi-semantic-core today*
([validateArchiModel](/libraries/archi-semantic-core/getting-started/validate-model/)).
Quality rules over parsed models are planned.

## Tooling

Developer tooling built on top of CDA structures.

*Nothing published yet.* A CLI validation gate and semantic diffing are
planned — see the [roadmap](/architecture/roadmap/).
