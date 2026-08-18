import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
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
        node.properties.href = deploymentBase + href;
      }
    }
    for (const child of node.children || []) walk(child);
  };
  return () => (tree) => walk(tree);
};

export default defineConfig({
  site: 'https://continuous-drivenarchitecture.github.io',
  base: '/docs/',
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
        'Open-source libraries and developer tooling for Continuous-Driven Architecture â€” architecture that software can understand.',
      logo: {
        src: './src/assets/cda-mark.svg',
        alt: 'CDA',
        replacesTitle: false,
      },
      favicon: 'favicon.svg',
      editLink: {
        baseUrl:
          'https://github.com/Continuous-DrivenArchitecture/developer-portal/edit/main/src/content/docs/',
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
        root: {
          label: 'English',
          lang: 'en',
          sidebar: [
            {
              label: 'Overview',
              link: '/',
            },
            {
              label: 'Get Started',
              items: [
                { label: 'What is CDA', link: '/get-started/what-is-cda/' },
                { label: 'The ecosystem', link: '/get-started/ecosystem/' },
                { label: 'First steps', link: '/get-started/first-steps/' },
              ],
            },
            {
              label: 'Libraries',
              items: [
                {
                  label: 'archi-semantic-core',
                  badge: { text: 'v0.4.2', variant: 'note' },
                  items: [
                    {
                      label: 'Getting Started',
                      items: [
                        { label: 'Introduction', link: '/libraries/archi-semantic-core/getting-started/introduction/' },
                        { label: 'Installation', link: '/libraries/archi-semantic-core/getting-started/installation/' },
                        { label: 'Parse your first model', link: '/libraries/archi-semantic-core/getting-started/parse-first-model/' },
                        { label: 'Working with .archimate archives', link: '/libraries/archi-semantic-core/getting-started/archives/' },
                        { label: 'Validate a model', link: '/libraries/archi-semantic-core/getting-started/validate-model/' },
                      ],
                    },
                    {
                      label: 'Core Concepts',
                      items: [
                        { label: 'ArchiModel', link: '/libraries/archi-semantic-core/core-concepts/archi-model/' },
                        { label: 'Elements', link: '/libraries/archi-semantic-core/core-concepts/elements/' },
                        { label: 'Relationships', link: '/libraries/archi-semantic-core/core-concepts/relationships/' },
                        { label: 'Views', link: '/libraries/archi-semantic-core/core-concepts/views/' },
                        { label: 'Diagram objects and connections', link: '/libraries/archi-semantic-core/core-concepts/diagram-objects-connections/' },
                        { label: 'IDs and references', link: '/libraries/archi-semantic-core/core-concepts/ids-references/' },
                        { label: 'Geometry and nested coordinates', link: '/libraries/archi-semantic-core/core-concepts/geometry/' },
                      ],
                    },
                    {
                      label: 'Native Archi Semantics',
                      items: [
                        { label: 'Junctions', link: '/libraries/archi-semantic-core/semantics/junctions/' },
                        { label: 'Access relationships', link: '/libraries/archi-semantic-core/semantics/access-relationships/' },
                        { label: 'Influence relationships', link: '/libraries/archi-semantic-core/semantics/influence-relationships/' },
                        { label: 'Association relationships', link: '/libraries/archi-semantic-core/semantics/association-relationships/' },
                        { label: 'Profiles and Specializations', link: '/libraries/archi-semantic-core/semantics/profiles-specializations/' },
                        { label: 'Visual styling', link: '/libraries/archi-semantic-core/semantics/visual-styling/' },
                        { label: 'Label Expressions', link: '/libraries/archi-semantic-core/semantics/label-expressions/' },
                      ],
                    },
                    {
                      label: 'Guides',
                      items: [
                        { label: 'Build lookup indexes', link: '/libraries/archi-semantic-core/guides/lookup-indexes/' },
                        { label: 'Impact analysis', link: '/libraries/archi-semantic-core/guides/impact-analysis/' },
                        { label: 'Structural validation in CI', link: '/libraries/archi-semantic-core/guides/validation-in-ci/' },
                        { label: 'Working with large models', link: '/libraries/archi-semantic-core/guides/large-models/' },
                        { label: 'Node archive handling', link: '/libraries/archi-semantic-core/guides/node-archive-handling/' },
                      ],
                    },
                    {
                      label: 'Compatibility',
                      items: [
                        { label: 'Compatibility philosophy', link: '/libraries/archi-semantic-core/compatibility/philosophy/' },
                        { label: 'Compatibility matrix', link: '/libraries/archi-semantic-core/compatibility/matrix/' },
                        { label: 'Known limitations', link: '/libraries/archi-semantic-core/compatibility/known-limitations/' },
                      ],
                    },
                    {
                      label: 'Project',
                      items: [
                        { label: 'Design principles', link: '/libraries/archi-semantic-core/project/design-principles/' },
                        { label: 'Contributing', link: '/libraries/archi-semantic-core/project/contributing/' },
                        { label: 'Changelog', link: '/libraries/archi-semantic-core/project/changelog/' },
                        { label: 'License', link: '/libraries/archi-semantic-core/project/license/' },
                      ],
                    },
                    {
                      label: 'API Reference',
                      items: [
                        { label: 'Overview', link: '/libraries/archi-semantic-core/reference/overview/' },
                        {
                          label: 'Functions',
                          items: [
                            { label: 'parseArchiModel', link: '/libraries/archi-semantic-core/reference/generated/functions/parseArchiModel/' },
                            { label: 'validateArchiModel', link: '/libraries/archi-semantic-core/reference/generated/functions/validateArchiModel/' },
                            { label: 'getLabelExpression', link: '/libraries/archi-semantic-core/reference/generated/functions/getLabelExpression/' },
                            { label: 'resolveLabelExpression', link: '/libraries/archi-semantic-core/reference/generated/functions/resolveLabelExpression/' },
                            {
                              label: 'extractArchiModelXml',
                              link: '/libraries/archi-semantic-core/reference/generated/functions/extractArchiModelXml/',
                              badge: { text: 'Node-only', variant: 'note' },
                            },
                          ],
                        },
                        {
                          label: 'Types and interfaces',
                          items: [
                            { label: 'ArchiModel', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiModel/' },
                            { label: 'ArchiModelMetadata', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiModelMetadata/' },
                            { label: 'ArchiFolder', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiFolder/' },
                            { label: 'ArchiElement', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiElement/' },
                            { label: 'ArchiRelationship', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiRelationship/' },
                            { label: 'ArchiView', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiView/' },
                            { label: 'ArchiDiagramObject', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiDiagramObject/' },
                            { label: 'ArchiDiagramConnection', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiDiagramConnection/' },
                            { label: 'ArchiNote', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiNote/' },
                            { label: 'ArchiBounds', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiBounds/' },
                            { label: 'ArchiBendpoint', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiBendpoint/' },
                            { label: 'ArchiStyle', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiStyle/' },
                            { label: 'ArchiFontStyle', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiFontStyle/' },
                            { label: 'ArchiFeature', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiFeature/' },
                            { label: 'ArchiProfile', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiProfile/' },
                            { label: 'ArchiProperty', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiProperty/' },
                            { label: 'ArchiValidationResult', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiValidationResult/' },
                            { label: 'ArchiValidationIssue', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiValidationIssue/' },
                            { label: 'ArchiJunctionType', link: '/libraries/archi-semantic-core/reference/generated/type-aliases/ArchiJunctionType/' },
                            { label: 'ArchiAccessType', link: '/libraries/archi-semantic-core/reference/generated/type-aliases/ArchiAccessType/' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: 'Architecture',
              items: [
                { label: 'Ecosystem architecture', link: '/architecture/ecosystem/' },
                { label: 'Roadmap', link: '/architecture/roadmap/' },
              ],
            },
            {
              label: 'Contributing',
              link: '/contributing/',
            },
          ],
        },
        es: {
          label: 'EspaÃ±ol',
          lang: 'es',
          sidebar: [
            {
              label: 'Resumen',
              link: '/es/',
            },
            {
              label: 'Primeros pasos',
              items: [
                { label: 'Â¿QuÃ© es CDA?', link: '/es/get-started/what-is-cda/' },
                { label: 'El ecosistema', link: '/es/get-started/ecosystem/' },
                { label: 'Primeros pasos', link: '/es/get-started/first-steps/' },
              ],
            },
            {
              label: 'LibrerÃ­as',
              items: [
                {
                  label: 'archi-semantic-core',
                  badge: { text: 'v0.4.2', variant: 'note' },
                  items: [
                    {
                      label: 'Primeros pasos',
                      items: [
                        { label: 'IntroducciÃ³n', link: '/es/libraries/archi-semantic-core/getting-started/introduction/' },
                        { label: 'InstalaciÃ³n', link: '/es/libraries/archi-semantic-core/getting-started/installation/' },
                        { label: 'Analice su primer modelo', link: '/es/libraries/archi-semantic-core/getting-started/parse-first-model/' },
                        { label: 'Trabajar con archivos .archimate', link: '/es/libraries/archi-semantic-core/getting-started/archives/' },
                        { label: 'Validar un modelo', link: '/es/libraries/archi-semantic-core/getting-started/validate-model/' },
                      ],
                    },
                    {
                      label: 'Conceptos clave',
                      items: [
                        { label: 'ArchiModel', link: '/es/libraries/archi-semantic-core/core-concepts/archi-model/' },
                        { label: 'Elementos', link: '/es/libraries/archi-semantic-core/core-concepts/elements/' },
                        { label: 'Relaciones', link: '/es/libraries/archi-semantic-core/core-concepts/relationships/' },
                        { label: 'Vistas', link: '/es/libraries/archi-semantic-core/core-concepts/views/' },
                        { label: 'Objetos de diagrama y conexiones', link: '/es/libraries/archi-semantic-core/core-concepts/diagram-objects-connections/' },
                        { label: 'IDs y referencias', link: '/es/libraries/archi-semantic-core/core-concepts/ids-references/' },
                        { label: 'GeometrÃ­a y coordenadas anidadas', link: '/es/libraries/archi-semantic-core/core-concepts/geometry/' },
                      ],
                    },
                    {
                      label: 'SemÃ¡ntica nativa de Archi',
                      items: [
                        { label: 'Uniones', link: '/es/libraries/archi-semantic-core/semantics/junctions/' },
                        { label: 'Relaciones de acceso', link: '/es/libraries/archi-semantic-core/semantics/access-relationships/' },
                        { label: 'Relaciones de influencia', link: '/es/libraries/archi-semantic-core/semantics/influence-relationships/' },
                        { label: 'Relaciones de asociaciÃ³n', link: '/es/libraries/archi-semantic-core/semantics/association-relationships/' },
                        { label: 'Perfiles y especializaciones', link: '/es/libraries/archi-semantic-core/semantics/profiles-specializations/' },
                        { label: 'Estilo visual', link: '/es/libraries/archi-semantic-core/semantics/visual-styling/' },
                        { label: 'Expresiones de etiqueta', link: '/es/libraries/archi-semantic-core/semantics/label-expressions/' },
                      ],
                    },
                    {
                      label: 'GuÃ­as',
                      items: [
                        { label: 'Crear Ã­ndices de bÃºsqueda', link: '/es/libraries/archi-semantic-core/guides/lookup-indexes/' },
                        { label: 'AnÃ¡lisis de impacto', link: '/es/libraries/archi-semantic-core/guides/impact-analysis/' },
                        { label: 'ValidaciÃ³n estructural en CI', link: '/es/libraries/archi-semantic-core/guides/validation-in-ci/' },
                        { label: 'Trabajo con modelos grandes', link: '/es/libraries/archi-semantic-core/guides/large-models/' },
                        { label: 'Manejo de archivos en Node', link: '/es/libraries/archi-semantic-core/guides/node-archive-handling/' },
                      ],
                    },
                    {
                      label: 'Compatibilidad',
                      items: [
                        { label: 'FilosofÃ­a de compatibilidad', link: '/es/libraries/archi-semantic-core/compatibility/philosophy/' },
                        { label: 'Matriz de compatibilidad', link: '/es/libraries/archi-semantic-core/compatibility/matrix/' },
                        { label: 'Limitaciones conocidas', link: '/es/libraries/archi-semantic-core/compatibility/known-limitations/' },
                      ],
                    },
                    {
                      label: 'Proyecto',
                      items: [
                        { label: 'Principios de diseÃ±o', link: '/es/libraries/archi-semantic-core/project/design-principles/' },
                        { label: 'Contribuciones', link: '/es/libraries/archi-semantic-core/project/contributing/' },
                        { label: 'Changelog', link: '/es/libraries/archi-semantic-core/project/changelog/' },
                        { label: 'Licencia', link: '/es/libraries/archi-semantic-core/project/license/' },
                      ],
                    },
                    {
                      label: 'Referencia de API',
                      items: [
                        { label: 'Resumen', link: '/es/libraries/archi-semantic-core/reference/overview/' },
                        {
                          label: 'Funciones',
                          items: [
                            { label: 'parseArchiModel', link: '/libraries/archi-semantic-core/reference/generated/functions/parseArchiModel/' },
                            { label: 'validateArchiModel', link: '/libraries/archi-semantic-core/reference/generated/functions/validateArchiModel/' },
                            { label: 'getLabelExpression', link: '/libraries/archi-semantic-core/reference/generated/functions/getLabelExpression/' },
                            { label: 'resolveLabelExpression', link: '/libraries/archi-semantic-core/reference/generated/functions/resolveLabelExpression/' },
                            {
                              label: 'extractArchiModelXml',
                              link: '/libraries/archi-semantic-core/reference/generated/functions/extractArchiModelXml/',
                              badge: { text: 'Solo Node', variant: 'note' },
                            },
                          ],
                        },
                        {
                          label: 'Tipos e interfaces',
                          items: [
                            { label: 'ArchiModel', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiModel/' },
                            { label: 'ArchiModelMetadata', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiModelMetadata/' },
                            { label: 'ArchiFolder', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiFolder/' },
                            { label: 'ArchiElement', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiElement/' },
                            { label: 'ArchiRelationship', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiRelationship/' },
                            { label: 'ArchiView', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiView/' },
                            { label: 'ArchiDiagramObject', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiDiagramObject/' },
                            { label: 'ArchiDiagramConnection', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiDiagramConnection/' },
                            { label: 'ArchiNote', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiNote/' },
                            { label: 'ArchiBounds', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiBounds/' },
                            { label: 'ArchiBendpoint', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiBendpoint/' },
                            { label: 'ArchiStyle', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiStyle/' },
                            { label: 'ArchiFontStyle', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiFontStyle/' },
                            { label: 'ArchiFeature', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiFeature/' },
                            { label: 'ArchiProfile', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiProfile/' },
                            { label: 'ArchiProperty', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiProperty/' },
                            { label: 'ArchiValidationResult', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiValidationResult/' },
                            { label: 'ArchiValidationIssue', link: '/libraries/archi-semantic-core/reference/generated/interfaces/ArchiValidationIssue/' },
                            { label: 'ArchiJunctionType', link: '/libraries/archi-semantic-core/reference/generated/type-aliases/ArchiJunctionType/' },
                            { label: 'ArchiAccessType', link: '/libraries/archi-semantic-core/reference/generated/type-aliases/ArchiAccessType/' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: 'Arquitectura',
              items: [
                { label: 'Arquitectura del ecosistema', link: '/es/architecture/ecosystem/' },
                { label: 'Hoja de ruta', link: '/es/architecture/roadmap/' },
              ],
            },
            {
              label: 'Contribuir',
              link: '/es/contributing/',
            },
          ],
        },
        de: { label: 'Deutsch', lang: 'de' },
        fr: { label: 'FranÃ§ais', lang: 'fr' },
        nl: { label: 'Nederlands', lang: 'nl' },
        pt: { label: 'Português', lang: 'pt' },
        zh: { label: '中文', lang: 'zh' },
      },
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
