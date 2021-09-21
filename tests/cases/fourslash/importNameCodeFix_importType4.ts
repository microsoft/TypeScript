/// <reference path="fourslash.ts" />

// @preserveValueImports: true
// @isolatedModules: true
// @module: es2015

// @Filename: /exports.ts
//// export interface SomeType {}
//// export class SomePig {}

// @Filename: /a.ts
//// import type { SomeType } from "./exports.js";
//// new SomePig/**/

goTo.marker("");
verify.importFixAtPosition([
`import { SomePig, type SomeType } from "./exports.js";
new SomePig`]);
