---
title: Introduction
description: What archi-semantic-core is, what it is not, and where it fits in the CDA ecosystem.
---

`archi-semantic-core` is a TypeScript library that parses **native `.archimate`
model files** created by the [Archi](https://www.archimatetool.com/) desktop
editor and exposes their semantics through a small, typed `ArchiModel`.

```text
.archimate XML  â†’  archi-semantic-core  â†’  ArchiModel
```

The library reads Archi's native XML format (`xmlns:archimate="http://www.archimatetool.com/archimate"` â€”
the format Archi itself reads and writes on disk) and converts it into a clean,
well-typed model containing:

- folders, elements and relationships;
- views, diagram objects, diagram connections and notes;
- documentation, properties, visual styling and geometry;
- Specializations and generic Profiles;
- the native semantic details â€” Junctions, Access/Influence/Association
  attributes, Label Expressions â€” needed to work with a model without
  understanding Archi's XML structure;
- the zip-archive variant of the `.archimate` file format, through the
  Node-only `/archive` subpath.

## What it is for

Use this package when you need to work programmatically with an Archi model
while keeping parsing independent from rendering, editing, quality rules, or
exchange-format conversion.

The parser focuses on two responsibilities:

- **preserving Archi-native information** that belongs to the semantic model;
- **exposing that information** through a small, typed TypeScript API.

It does not reinterpret the model for another standard.

## What it is not

This package is **not**:

- a parser or generator for the
  [ArchiMateÂ® Model Exchange File Format](https://www.opengroup.org/xsd/archimate/);
- an editor or a mutation framework;
- a renderer, layout engine, or diagram-routing engine;
- an architecture-quality linter;
- a general query engine or graph database;
- a serializer back to `.archimate`.

Those are separate concerns and belong in separate packages. The
[Known limitations](/libraries/archi-semantic-core/compatibility/known-limitations/) page lists the full
boundary.

## Where it fits

`archi-semantic-core` is the first cornerstone of the
Continuous-Driven Architecture (CDA) ecosystem: a faithful, typed semantic
representation of how a design is built in the Archi editor. Downstream tools
consume that representation for impact analysis, drift detection, and
architecture evolution â€” layers that may build a navigable graph on top,
instead of this package trying to be one itself.

:::caution[Not affiliated with Archi]

This project is not affiliated with or endorsed by Archi, the Archi Tool
project, or The Open Group.

:::

## Next steps

- [Installation](/libraries/archi-semantic-core/getting-started/installation/) â€” requirements and install.
- [Parse your first model](/libraries/archi-semantic-core/getting-started/parse-first-model/) â€” a minimal end-to-end example.
- [ArchiModel](/libraries/archi-semantic-core/core-concepts/archi-model/) â€” what the parsed model contains.
