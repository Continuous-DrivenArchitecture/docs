# CDA Developer Portal

The developer documentation site for the
[Continuous-Driven Architecture](https://github.com/Continuous-DrivenArchitecture)
(CDA) ecosystem — an open-source suite of libraries and tooling for working
with architecture as structured, processable software artifacts.

Built with [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/)
and deployed to GitHub Pages.

## Live site

<https://continuous-drivenarchitecture.github.io/developer-portal/>

## Structure

```text
developer-portal/
├── src/content/docs/
│   ├── index.mdx            # portal home
│   ├── get-started/         # CDA onboarding
│   ├── libraries/           # one section per @cda library
│   │   └── archi-semantic-core/
│   │       ├── getting-started/
│   │       ├── core-concepts/
│   │       ├── semantics/
│   │       ├── guides/
│   │       ├── compatibility/
│   │       ├── project/
│   │       └── reference/   # generated API reference (gitignored)
│   ├── architecture/        # ecosystem architecture and roadmap
│   └── contributing.md
├── src/styles/cda.css       # CDA design system
└── typedoc.json             # API reference generation
```

## The API reference rule

The source of truth for a library's public API lives **in that library's
repository** (its JSDoc). The portal generates each library's reference from
the **published npm package** during CI — nothing is copied by hand:

```text
@cda/<library> published to npm
        │
        │ TypeDoc (typedoc.json, against node_modules)
        ▼
src/content/docs/libraries/<library>/reference/generated/
```

To regenerate locally:

```sh
npm ci
npm run gen:api
npm run dev        # or npm run build
```

To update the documented version of a library, bump its pinned dependency in
`package.json` (e.g. `"@cda/archi-semantic-core": "0.4.1"`) and rebuild.

## Contributing

See [Contributing](https://continuous-drivenarchitecture.github.io/developer-portal/contributing/).

## License

MIT
