/// <reference path="fourslash.ts" />

// @moduleResolution: bundler
// @allowImportingTsExtensions: true
// @noEmit: true

// @Filename: /node_modules/@types/foo/index.d.ts
//// export const fromAtTypesFoo: number;

// @Filename: /node_modules/bar/index.d.ts
//// export const fromBar: number;

// @Filename: /local.ts
//// export const fromLocal: number;

// @Filename: /Component.tsx
//// export function Component() { return null; }

// @Filename: /main.ts
//// /**/

verify.baselineAutoImports("", /*fullNamesForCodeFix*/ undefined, { importModuleSpecifierEnding: "js" });
