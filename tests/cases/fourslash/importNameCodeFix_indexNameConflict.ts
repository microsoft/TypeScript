/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /a/index.ts
//// export const aIndex = 0;

// @Filename: /a.ts
//// export {};

// @Filename: /index.ts
//// aIndex/**/

goTo.marker("");
verify.importFixAtPosition([
`import { aIndex } from "./a/index";

aIndex`
]);
