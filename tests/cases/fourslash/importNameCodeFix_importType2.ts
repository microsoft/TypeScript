/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @module: es2015

// @Filename: /exports1.ts
//// export default interface SomeType {}
//// export interface OtherType {}
//// export interface OtherOtherType {}
//// export const someValue = 0;

// @Filename: /a.ts
//// import type SomeType from "./exports1.js";
//// someValue/*a*/

// @Filename: /b.ts
//// import { someValue } from "./exports1.js";
//// const b: SomeType/*b*/ = someValue;

// @Filename: /c.ts
//// import type SomeType from "./exports1.js";
//// const x: OtherType/*c*/

// @Filename: /d.ts
//// import type { OtherType } from "./exports1.js";
//// const x: OtherOtherType/*d*/

goTo.marker("a");
verify.importFixAtPosition([
`import type SomeType from "./exports1.js";
import { someValue } from "./exports1.js";
someValue`]);

goTo.marker("b");
verify.importFixAtPosition([
`import type SomeType from "./exports1.js";
import { someValue } from "./exports1.js";
const b: SomeType = someValue;`]);

goTo.marker("c");
verify.importFixAtPosition([
`import type { OtherType } from "./exports1.js";
import type SomeType from "./exports1.js";
const x: OtherType`]);

goTo.marker("d");
verify.importFixAtPosition([
`import type { OtherOtherType, OtherType } from "./exports1.js";
const x: OtherOtherType`]);
