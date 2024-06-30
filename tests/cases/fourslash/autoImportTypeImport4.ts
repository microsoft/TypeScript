/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @target: esnext

// @Filename: /exports1.ts
//// export const a = 0;
//// export const A = 1;
//// export const b = 2;
//// export const B = 3;
//// export const c = 4;
//// export const C = 5;
//// export type x = 6;
//// export const X = 7;
//// export const Y = 8;
//// export const Z = 9;

// @Filename: /exports2.ts
//// export const d = 0;
//// export const D = 1;
//// export const e = 2;
//// export const E = 3;

// @Filename: /index0.ts
//// import { A, B, C } from "./exports1";
//// a/*0*//*0a*/;
//// b;

// @Filename: /index1.ts
//// import { A, B, C, type Y, type Z } from "./exports1";
//// a/*1*//*1a*//*1b*//*1c*/;
//// b;

// @Filename: /index2.ts
//// import { A, a, B, b, type Y, type Z } from "./exports1";
//// import { E } from "./exports2";
//// d/*2*//*2a*//*2b*//*2c*/

// addition of correctly sorted type imports should not affect behavior as shown in autoImportSortCaseSensitivity1.ts
goTo.marker("0");
verify.importFixAtPosition([
    `import { a, A, B, C } from "./exports1";\na;\nb;`,
    `import { A, b, B, C } from "./exports1";\na;\nb;`,
],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder : "last" });
goTo.marker("0a");
verify.importFixAtPosition([
    `import { a, A, B, C } from "./exports1";\na;\nb;`,
    `import { A, b, B, C } from "./exports1";\na;\nb;`
],
    /*errorCode*/ undefined,
    { organizeImportsIgnoreCase: true, organizeImportsTypeOrder : "last" });

goTo.marker("1");
verify.importFixAtPosition([
    `import { a, A, B, C, type Y, type Z } from "./exports1";\na;\nb;`,
    `import { A, b, B, C, type Y, type Z } from "./exports1";\na;\nb;`,
],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder : "last" });
goTo.marker("1a");
verify.importFixAtPosition([
    `import { a, A, B, C, type Y, type Z } from "./exports1";\na;\nb;`,
    `import { A, b, B, C, type Y, type Z } from "./exports1";\na;\nb;`
],
    /*errorCode*/ undefined,
    { organizeImportsIgnoreCase: true, organizeImportsTypeOrder : "last" });

goTo.marker("1b");
// if we sort inline and sensitive, then all upper case imports should be sorted before any lower case imports
verify.importFixAtPosition([
    `import { a, A, B, C, type Y, type Z } from "./exports1";\na;\nb;`,
    `import { A, b, B, C, type Y, type Z } from "./exports1";\na;\nb;`,
],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder : "inline" });
goTo.marker("1c");
verify.importFixAtPosition([
    `import { a, A, B, C, type Y, type Z } from "./exports1";\na;\nb;`,
    `import { A, b, B, C, type Y, type Z } from "./exports1";\na;\nb;`
],
    /*errorCode*/ undefined,
    { organizeImportsIgnoreCase: true, organizeImportsTypeOrder : "inline" });

goTo.marker("2");
verify.importFixAtPosition([
`import { A, a, B, b, type Y, type Z } from "./exports1";
import { d, E } from "./exports2";
d`,
],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder : "last" });
goTo.marker("2a");
verify.importFixAtPosition([
`import { A, a, B, b, type Y, type Z } from "./exports1";
import { E, d } from "./exports2";
d`
],
    /*errorCode*/ undefined,
    { organizeImportsIgnoreCase: false, organizeImportsTypeOrder : "last" });
goTo.marker("2b");
verify.importFixAtPosition([
`import { A, a, B, b, type Y, type Z } from "./exports1";
import { d, E } from "./exports2";
d`,
],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder : "last" });
goTo.marker("2c");
verify.importFixAtPosition([
`import { A, a, B, b, type Y, type Z } from "./exports1";
import { E, d } from "./exports2";
d`
],
    /*errorCode*/ undefined,
    { organizeImportsIgnoreCase: false, organizeImportsTypeOrder : "last" });