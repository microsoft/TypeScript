/// <reference path="fourslash.ts" />

// @module: es2015

// sorting and multiline imports and trailing commas, oh my

// @Filename: /exports.ts
//// export interface SomeInterface {}
//// export class SomePig {}

// @Filename: /a.ts
//// import {
////     type SomeInterface,
////     type SomePig,
//// } from "./exports.js";
//// new SomePig/**/

goTo.marker("");
verify.importFixAtPosition([
`import {
    SomePig,
    type SomeInterface,
} from "./exports.js";
new SomePig`]);
