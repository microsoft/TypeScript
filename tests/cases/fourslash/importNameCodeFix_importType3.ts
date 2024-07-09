/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @module: es2015

// @Filename: /exports.ts
//// class SomeClass {}
//// export type { SomeClass };

// @Filename: /a.ts
//// import {} from "./exports.js";
//// function takeSomeClass(c: SomeClass/**/)

goTo.marker("");
verify.importFixAtPosition([
`import { type SomeClass } from "./exports.js";
function takeSomeClass(c: SomeClass)`]);
