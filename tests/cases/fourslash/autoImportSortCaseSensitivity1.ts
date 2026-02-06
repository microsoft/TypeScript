/// <reference path="fourslash.ts" />

// @Filename: /exports1.ts
//// export const a = 0;
//// export const A = 1;
//// export const b = 2;
//// export const B = 3;
//// export const c = 4;
//// export const C = 5;

// @Filename: /exports2.ts
//// export const d = 0;
//// export const D = 1;
//// export const e = 2;
//// export const E = 3;

// Ambiguous in whole file: use user preference, default to case-sensitive

// @Filename: /index0.ts
//// import { A, B, C } from "./exports1";
//// a/*0*/

// Ambiguous in target import: use user preference, look at other imports in file

// @Filename: /index1.ts
//// import { A, a, B, b } from "./exports1";
//// import { E } from "./exports2";
//// d/*1*/

goTo.marker("0");
verify.importFixAtPosition([`import { a, A, B, C } from "./exports1";\na`]);
verify.importFixAtPosition([`import { a, A, B, C } from "./exports1";\na`],
    /*errorCode*/ undefined,
    { organizeImportsIgnoreCase: true });

goTo.marker("1");
verify.importFixAtPosition([
`import { A, a, B, b } from "./exports1";
import { d, E } from "./exports2";
d`]);
verify.importFixAtPosition([
`import { A, a, B, b } from "./exports1";
import { E, d } from "./exports2";
d`], /*errorCode*/ undefined, { organizeImportsIgnoreCase: false });