/// <reference path="fourslash.ts" />

// @moduleResolution: minimal

// @Filename: /node_modules/@types/foo/index.d.ts
//// export const fromAtTypesFoo: number;

// @Filename: /node_modules/bar/index.d.ts
//// export const fromBar: number;

// @Filename: /local.ts
//// export const fromLocal: number;

// @Filename: /main.ts
//// /**/

verify.baselineAutoImports("");
