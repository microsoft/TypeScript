/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @target: esnext

// @Filename: /foo.ts
//// export const A = 1;
//// export type B = { x: number };
//// export type C = 1;
//// export class D = { y: string };

// @Filename: /test.ts
//// import { A, type B, type C } from './foo';
//// const b: B | C;
//// console.log(A, D/**/);

goTo.marker("");

verify.importFixAtPosition([
`import { A, D, type B, type C } from './foo';
const b: B | C;
console.log(A, D);`],
    /*errorCode*/ undefined,
    { organizeImportsIgnoreCase: true, organizeImportsTypeOrder : "last" });

// verify.importFixAtPosition([
// `import { A, type B, type C, D } from './foo';
// const b: B | C;
// console.log(A, D);`],
//     /*errorCode*/ undefined,
//     { organizeImportsIgnoreCase: true, organizeImportsTypeOrder : "inline" });

// verify.importFixAtPosition([
// `import { A, type B, type C, D } from './foo';
// const b: B | C;
// console.log(A, D);`],
//     /*errorCode*/ undefined,
//     { organizeImportsIgnoreCase: true, organizeImportsTypeOrder : "first" });