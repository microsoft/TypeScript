/// <reference path="fourslash.ts" />

// @preserveValueImports: true
// @isolatedModules: true
// @module: es2015

// @Filename: /exports.ts
//// export interface SomeInterface {}
//// export class SomePig {}

// @Filename: /a.ts
//// import type { SomeInterface } from "./exports.js";
//// new SomePig/**/

goTo.marker("");
verify.importFixAtPosition([
`import { SomePig, type SomeInterface } from "./exports.js";
new SomePig`]);
