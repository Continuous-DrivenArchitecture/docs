import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { fileURLToPath } from 'node:url';

// GitHub Pages hosts the repository under a path, not the org root.
// `site` + `base` keep every generated asset and link repository-path aware.
const base = '/docs/';

// Rewrites root-absolute links inside markdown/mdx content so they include
// the deployment base. Astro does not prefix these automatically.
const baseLinks = ({ base: deploymentBase }) => {
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'element' && node.tagName === 'a') {
      const href = node.properties && node.properties.href;
      if (
        typeof href === 'string' &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !href.startsWith(deploymentBase)
      ) {
        node.properties.href = deploymentBase + href.slice(1);
      }
    }
    for (const child of node.children || []) walk(child);
  };
  return () => (tree) => walk(tree);
};

export default defineConfig({
  site: 'https://continuous-drivenarchitecture.github.io',
  base: '/docs/',
  markdown: {
    processor: unified({ rehypePlugins: [baseLinks({ base })] }),
  },
  vite: {
    resolve: {
      // Lets content read the pinned library version from the installed
      // package at build time (bundled statically, no runtime fs access).
      alias: {
        '@cda-lib-version': fileURLToPath(
          new URL('./node_modules/@cda/archi-semantic-core/package.json', import.meta.url),
        ),
      },
    },
  },
  integrations: [
    starlight({
      title: 'CDA Developer Portal',
      description:
        'Open-source libraries and developer tooling for Continuous-Driven Architecture — architecture that software can understand.',
      logo: {
        src: './src/assets/cda-mark.svg',
        alt: 'CDA',
        replacesTitle: false,
      },
      favicon: 'favicon.svg',
      editLink: {
        baseUrl: 'https://github.com/Continuous-DrivenArchitecture/docs/edit/main/',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Continuous-DrivenArchitecture',
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:site_name',
            content: 'CDA Developer Portal',
          },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:type', content: 'website' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary' },
        },
      ],
      components: {
        Footer: './src/components/Footer.astro',
      },
      // Canonical locale is English served at the root (Starlight's `root`
      // locale keeps the default at / instead of /en/). The remaining
      // locales are declared up front so the architecture is
      // translation-ready: content dirs can be added per locale without
      // touching the configuration.
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        es: { label: 'Español', lang: 'es' },
        de: { label: 'Deutsch', lang: 'de' },
        fr: { label: 'Français', lang: 'fr' },
        nl: { label: 'Nederlands', lang: 'nl' },
        pt: { label: 'Português', lang: 'pt' },
        zh: { label: '中文', lang: 'zh' },
      },
      // Single sidebar shared by all locales. Starlight prefixes internal
      // links with the active locale, and `translations` localize labels.
      sidebar: [
        {
          label: 'Overview',
          translations: { es: 'Resumen' },
          link: '/',
        },
        {
          label: 'Learn',
          translations: { es: 'Aprender' },
          items: [
            {
              label: 'What is CDA?',
              translations: { es: '¿Qué es CDA?' },
              link: '/get-started/what-is-cda/',
            },
            {
              label: 'The ecosystem',
              translations: { es: 'El ecosistema' },
              link: '/get-started/ecosystem/',
            },
            {
              label: 'Quick Start',
              translations: { es: 'Inicio rápido' },
              link: '/get-started/quick-start/',
            },
          ],
        },
        {
          label: 'Libraries',
          translations: { es: 'Librerías' },
          items: [
            {
              label: 'Library catalog',
              translations: { es: 'Catálogo de librerías' },
              link: '/libraries/',
            },
            {
              label: 'archi-semantic-core',
              badge: { text: 'v0.4.2', variant: 'note' },
              items: [
                {
                  label: 'Overview',
                  translations: { es: 'Resumen' },
                  link: '/libraries/archi-semantic-core/',
                },
                {
                  label: 'Getting Started',
                  translations: { es: 'Primeros pasos' },
                  items: [
                    {
                      label: 'Introduction',
                      translations: { es: 'Introducción' },
                      link: '/libraries/archi-semantic-core/getting-started/introduction/',
                    },
                    {
                      label: 'Installation',
                      translations: { es: 'Instalación' },
                      link: '/libraries/archi-semantic-core/getting-started/installation/',
                    },
                    {
                      label: 'Parse your first model',
                      translations: { es: 'Analiza tu primer modelo' },
                      link: '/libraries/archi-semantic-core/getting-started/parse-first-model/',
                    },
                    {
                      label: 'Working with .archimate archives',
                      translations: { es: 'Trabajar con archivos .archimate' },
                      link: '/libraries/archi-semantic-core/getting-started/archives/',
                    },
                    {
                      label: 'Validate a model',
                      translations: { es: 'Validar un modelo' },
                      link: '/libraries/archi-semantic-core/getting-started/validate-model/',
                    },
                  ],
                },
                {
                  label: 'Core Concepts',
                  translations: { es: 'Conceptos clave' },
                  items: [
                    {
                      label: 'ArchiModel',
                      link: '/libraries/archi-semantic-core/core-concepts/archi-model/',
                    },
                    {
                      label: 'Elements',
                      translations: { es: 'Elementos' },
                      link: '/libraries/archi-semantic-core/core-concepts/elements/',
                    },
                    {
                      label: 'Relationships',
                      translations: { es: 'Relaciones' },
                      link: '/libraries/archi-semantic-core/core-concepts/relationships/',
                    },
                    {
                      label: 'Views',
                      translations: { es: 'Vistas' },
                      link: '/libraries/archi-semantic-core/core-concepts/views/',
                    },
                    {
                      label: 'Diagram objects and connections',
                      translations: { es: 'Objetos y conexiones de diagrama' },
                      link: '/libraries/archi-semantic-core/core-concepts/diagram-objects-connections/',
                    },
                    {
                      label: 'IDs and references',
                      translations: { es: 'IDs y referencias' },
                      link: '/libraries/archi-semantic-core/core-concepts/ids-references/',
                    },
                    {
                      label: 'Geometry and nested coordinates',
                      translations: { es: 'Geometría y coordenadas anidadas' },
                      link: '/libraries/archi-semantic-core/core-concepts/geometry/',
                    },
                  ],
                },
                {
                  label: 'Native Archi Semantics',
                  translations: { es: 'Semántica nativa de Archi' },
                  items: [
                    {
                      label: 'Junctions',
                      translations: { es: 'Uniones' },
                      link: '/libraries/archi-semantic-core/semantics/junctions/',
                    },
                    {
                      label: 'Access relationships',
                      translations: { es: 'Relaciones de acceso' },
                      link: '/libraries/archi-semantic-core/semantics/access-relationships/',
                    },
                    {
                      label: 'Influence relationships',
                      translations: { es: 'Relaciones de influencia' },
                      link: '/libraries/archi-semantic-core/semantics/influence-relationships/',
                    },
                    {
                      label: 'Association relationships',
                      translations: { es: 'Relaciones de asociación' },
                      link: '/libraries/archi-semantic-core/semantics/association-relationships/',
                    },
                    {
                      label: 'Profiles and Specializations',
                      translations: { es: 'Perfiles y especializaciones' },
                      link: '/libraries/archi-semantic-core/semantics/profiles-specializations/',
                    },
                    {
                      label: 'Visual styling',
                      translations: { es: 'Estilo visual' },
                      link: '/libraries/archi-semantic-core/semantics/visual-styling/',
                    },
                    {
                      label: 'Label Expressions',
                      translations: { es: 'Expresiones de etiqueta' },
                      link: '/libraries/archi-semantic-core/semantics/label-expressions/',
                    },
                  ],
                },
                {
                  label: 'Guides',
                  translations: { es: 'Guías' },
                  items: [
                    {
                      label: 'Build lookup indexes',
                      translations: { es: 'Construir índices de búsqueda' },
                      link: '/libraries/archi-semantic-core/guides/lookup-indexes/',
                    },
                    {
                      label: 'Impact analysis',
                      translations: { es: 'Análisis de impacto' },
                      link: '/libraries/archi-semantic-core/guides/impact-analysis/',
                    },
                    {
                      label: 'Structural validation in CI',
                      translations: { es: 'Validación estructural en CI' },
                      link: '/libraries/archi-semantic-core/guides/validation-in-ci/',
                    },
                    {
                      label: 'Working with large models',
                      translations: { es: 'Trabajar con modelos grandes' },
                      link: '/libraries/archi-semantic-core/guides/large-models/',
                    },
                    {
                      label: 'Node archive handling',
                      translations: { es: 'Manejo de archivos en Node' },
                      link: '/libraries/archi-semantic-core/guides/node-archive-handling/',
                    },
                  ],
                },
                {
                  label: 'Compatibility',
                  translations: { es: 'Compatibilidad' },
                  items: [
                    {
                      label: 'Compatibility philosophy',
                      translations: { es: 'Filosofía de compatibilidad' },
                      link: '/libraries/archi-semantic-core/compatibility/philosophy/',
                    },
                    {
                      label: 'Compatibility matrix',
                      translations: { es: 'Matriz de compatibilidad' },
                      link: '/libraries/archi-semantic-core/compatibility/matrix/',
                    },
                    {
                      label: 'Known limitations',
                      translations: { es: 'Limitaciones conocidas' },
                      link: '/libraries/archi-semantic-core/compatibility/known-limitations/',
                    },
                  ],
                },
                {
                  label: 'Project',
                  translations: { es: 'Proyecto' },
                  items: [
                    {
                      label: 'Design principles',
                      translations: { es: 'Principios de diseño' },
                      link: '/libraries/archi-semantic-core/project/design-principles/',
                    },
                    {
                      label: 'Contributing',
                      translations: { es: 'Contribuir' },
                      link: '/libraries/archi-semantic-core/project/contributing/',
                    },
                    {
                      label: 'Changelog',
                      translations: { es: 'Historial de cambios' },
                      link: '/libraries/archi-semantic-core/project/changelog/',
                    },
                    {
                      label: 'License',
                      translations: { es: 'Licencia' },
                      link: '/libraries/archi-semantic-core/project/license/',
                    },
                  ],
                },
                {
                  label: 'API Reference',
                  translations: { es: 'Referencia de la API' },
                  items: [
                    {
                      label: 'Overview',
                      translations: { es: 'Resumen' },
                      link: '/libraries/archi-semantic-core/reference/overview/',
                    },
                    {
                      label: 'Functions',
                      translations: { es: 'Funciones' },
                      items: [
                        {
                          label: 'parseArchiModel',
                          link: '/libraries/archi-semantic-core/reference/generated/functions/parseArchiModel/',
                        },
                        {
                          label: 'validateArchiModel',
                          link: '/libraries/archi-semantic-core/reference/generated/functions/validateArchiModel/',
                        },
                        {
                          label: 'getLabelExpression',
                          link: '/libraries/archi-semantic-core/reference/generated/functions/getLabelExpression/',
                        },
                        {
                          label: 'resolveLabelExpression',
                          link: '/libraries/archi-semantic-core/reference/generated/functions/resolveLabelExpression/',
                        },
                        {
                          label: 'extractArchiModelXml',
                          translations: { es: 'extractArchiModelXml (solo Node)' },
                          link: '/libraries/archi-semantic-core/reference/generated/functions/extractArchiModelXml/',
                          badge: { text: 'Node-only', variant: 'note' },
                        },
                      ],
                    },
                    {
                      label: 'Types and interfaces',
                      translations: { es: 'Tipos e interfaces' },
                      items: [
                        {
                          label: 'ArchiModel',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiModel/',
                        },
                        {
                          label: 'ArchiModelMetadata',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiModelMetadata/',
                        },
                        {
                          label: 'ArchiFolder',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiFolder/',
                        },
                        {
                          label: 'ArchiElement',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiElement/',
                        },
                        {
                          label: 'ArchiRelationship',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiRelationship/',
                        },
                        {
                          label: 'ArchiView',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiView/',
                        },
                        {
                          label: 'ArchiDiagramObject',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiDiagramObject/',
                        },
                        {
                          label: 'ArchiDiagramConnection',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiDiagramConnection/',
                        },
                        {
                          label: 'ArchiNote',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiNote/',
                        },
                        {
                          label: 'ArchiBounds',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiBounds/',
                        },
                        {
                          label: 'ArchiBendpoint',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiBendpoint/',
                        },
                        {
                          label: 'ArchiStyle',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiStyle/',
                        },
                        {
                          label: 'ArchiFontStyle',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiFontStyle/',
                        },
                        {
                          label: 'ArchiFeature',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiFeature/',
                        },
                        {
                          label: 'ArchiProfile',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiProfile/',
                        },
                        {
                          label: 'ArchiProperty',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiProperty/',
                        },
                        {
                          label: 'ArchiValidationResult',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiValidationResult/',
                        },
                        {
                          label: 'ArchiValidationIssue',
                          link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiValidationIssue/',
                        },
                        {
                          label: 'ArchiJunctionType',
                          link: '/libraries/archi-semantic-core/reference/generated/type-aliases/ArchiJunctionType/',
                        },
                        {
                          label: 'ArchiAccessType',
                          link: '/libraries/archi-semantic-core/reference/generated/type-aliases/ArchiAccessType/',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Ecosystem',
          translations: { es: 'Ecosistema' },
          items: [
            {
              label: 'Ecosystem architecture',
              translations: { es: 'Arquitectura del ecosistema' },
              link: '/architecture/ecosystem/',
            },
            {
              label: 'Roadmap',
              translations: { es: 'Hoja de ruta' },
              link: '/architecture/roadmap/',
            },
          ],
        },
        {
          label: 'Community',
          translations: { es: 'Comunidad' },
          items: [
            {
              label: 'Contributing',
              translations: { es: 'Contribuir' },
              link: '/contributing/',
            },
          ],
        },
      ],
      customCss: ['./src/styles/cda.css'],
    }),
    sitemap({
      customPages: [
        'https://github.com/Continuous-DrivenArchitecture',
        'https://www.npmjs.com/org/cda',
      ],
    }),
  ],
});