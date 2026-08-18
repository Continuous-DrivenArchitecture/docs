import libPkg from '@cda-lib-version';

/**
 * Catalog of CDA libraries, data-driven so the ecosystem can grow to
 * 10-20 libraries without a redesign. Add a new entry per library.
 *
 * Facts come from the installed npm package (version) and the library
 * repository (status, license, engines). Nothing here is invented.
 */

// Base URL of the deployment (e.g. `/docs/` on GitHub Pages). Component
// links built from these paths must include it, unlike markdown content
// which is rewritten by the `baseLinks` processor plugin.
const base = import.meta.env.BASE_URL;

export interface CdaLibrary {
  /** npm package name under the @cda scope. */
  name: string;
  /** One-line purpose, written for developers. */
  tagline: string;
  /** Capability taxonomy the library belongs to. */
  capability: 'Model' | 'Semantics' | 'Transform' | 'Validate' | 'Tooling';
  /** Homepage-path to the library documentation (relative to the site root). */
  docsPath: string;
  /** Path to the library overview page. */
  overviewPath: string;
  /** Path to the library quick start page. */
  quickStartPath: string;
  /** npm homepage. */
  npmUrl: string;
  /** Source repository. */
  repoUrl: string;
  /** Release/changelog page path within the portal. */
  changelogPath: string;
  /** License identifier from the package. */
  license: string;
  /** Supported Node.js engines from the package. */
  nodeEngines: string;
  /** ESM-only vs dual module format. */
  moduleFormat: string;
  /** Package status as established by the project's own roadmap. */
  status: 'stable' | 'experimental';
  /** npm registry package name. */
  pkgName: string;
  /** Installed version from node_modules (the version this portal documents). */
  version: string;
}

export const libraries: CdaLibrary[] = [
  {
    name: 'archi-semantic-core',
    pkgName: '@cda/archi-semantic-core',
    tagline: 'Parse native Archi .archimate models into typed semantic structures.',
    capability: 'Model',
    docsPath: `${base}libraries/archi-semantic-core/`,
    overviewPath: `${base}libraries/archi-semantic-core/getting-started/introduction/`,
    quickStartPath: `${base}libraries/archi-semantic-core/getting-started/parse-first-model/`,
    npmUrl: 'https://www.npmjs.com/package/@cda/archi-semantic-core',
    repoUrl: 'https://github.com/Continuous-DrivenArchitecture/archi-semantic-core',
    changelogPath: `${base}libraries/archi-semantic-core/project/changelog/`,
    license: libPkg.license ?? 'MIT',
    nodeEngines: libPkg.engines?.node ?? '^20.0.0 || ^22.0.0 || >=24.0.0',
    moduleFormat: 'ESM-only',
    status: 'stable',
    version: libPkg.version,
  },
];

export function getLibrary(name: string): CdaLibrary | undefined {
  return libraries.find((lib) => lib.name === name);
}
