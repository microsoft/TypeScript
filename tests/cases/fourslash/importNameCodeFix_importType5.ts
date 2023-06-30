/// <reference path="fourslash.ts" />

// @module: es2015

// @Filename: /exports.ts
//// export interface SomeInterface {}
//// export class SomePig {}

// @Filename: /a.ts
//// import type { SomeInterface, SomePig } from "./exports.js";
//// new SomePig/**/

goTo.marker("");
verify.importFixAtPosition([
`import { SomeInterface, SomePig } from "./exports.js";
new SomePig`]);
