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

// since we cannot detect a type order from the original file, type order defaults to last
verify.importFixAtPosition([
`import {
    SomePig,
    type SomeInterface,
} from "./exports.js";
new SomePig`]);

verify.importFixAtPosition([
`import {
    SomePig,
    type SomeInterface,
} from "./exports.js";
new SomePig`],
/*errorCode*/ undefined,
{ organizeImportsTypeOrder: "last" });

verify.importFixAtPosition([
`import {
    type SomeInterface,
    SomePig,
} from "./exports.js";
new SomePig`],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder: "inline" }
);

verify.importFixAtPosition([
`import {
    type SomeInterface,
    SomePig,
} from "./exports.js";
new SomePig`],
/*errorCode*/ undefined,
{ organizeImportsTypeOrder: "first" });
