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
//// export type y = 8
//// export const Y = 9;
//// export const Z = 10;

// @Filename: /exports2.ts
//// export const d = 0;
//// export const D = 1;
//// export const e = 2;
//// export const E = 3;

// @Filename: /index0.ts
//// import { type X, type Y, type Z } from "./exports1";
//// const foo: x/*0*/;
//// const bar: y;

// @Filename: /index1.ts
//// import { A, B, type X, type Y, type Z } from "./exports1";
//// const foo: x/*1*/;
//// const bar: y;

// addition of correctly sorted regular imports should not affect correctly sorted type imports
goTo.marker("0");
verify.importFixAtPosition([
    `import { type x, type X, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
    `import { type X, type y, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder : "last" });
verify.importFixAtPosition([
    `import { type x, type X, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
    `import { type X, type y, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
],
    /*errorCode*/ undefined,
    { organizeImportsIgnoreCase: true, organizeImportsTypeOrder : "last" });
verify.importFixAtPosition([
    `import { type x, type X, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
    `import { type X, type y, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder : "inline" });
verify.importFixAtPosition([
    `import { type x, type X, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
    `import { type X, type y, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
],
    /*errorCode*/ undefined,
    { organizeImportsIgnoreCase: true, organizeImportsTypeOrder : "inline" });    
verify.importFixAtPosition([
    `import { type x, type X, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
    `import { type X, type y, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder : "first" });
verify.importFixAtPosition([
    `import { type x, type X, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
    `import { type X, type y, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
],
    /*errorCode*/ undefined,
    { organizeImportsIgnoreCase: true, organizeImportsTypeOrder : "first" });

goTo.marker("1");
verify.importFixAtPosition([
    `import { A, B, type x, type X, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
    `import { A, B, type X, type y, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder : "last" });
verify.importFixAtPosition([
    `import { A, B, type x, type X, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
    `import { A, B, type X, type y, type Y, type Z } from "./exports1";\nconst foo: x;\nconst bar: y;`,
],
    /*errorCode*/ undefined,
    { organizeImportsIgnoreCase: true, organizeImportsTypeOrder : "last" });