---
title: What is CDA?
description: Continuous-Driven Architecture — architecture as structured, processable software artifacts.
---

**Continuous-Driven Architecture (CDA)** is an open-source ecosystem of
libraries and developer tooling built around one idea:

> Architecture that software can understand.

Architecture models today live inside desktop editors. They are rich,
faithful design intent — but they are largely opaque to software: closed
formats, human-centric workflows, no CI, no diffs, no automation.

CDA treats architecture as **structured data**: versioned like source code,
validated in pipelines, consumable by tools. The first step in that
direction is reading the models architects actually produce — natively,
faithfully, without lossy reinterpretation — and exposing them through
small, typed APIs.

## What CDA is not

- Not a new architecture methodology — existing frameworks and tools (such
  as Archi and ArchiMate®) remain the source of truth for modeling.
- Not a replacement for modeling tools — CDA consumes their output.
- Not a single monolithic platform — a suite of independent packages.

## The core principle

> **Faithfulness over convenience.** A model means what the modeling tool
> stored, not what a consumer might find convenient. Every CDA package
> preserves native semantics and documents boundaries honestly — including
> what it does not do.

## Where it fits

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

## Next steps

- [The ecosystem](/get-started/ecosystem/) — the current and planned packages.
- [Quick Start](/get-started/quick-start/) — a working end-to-end example.
