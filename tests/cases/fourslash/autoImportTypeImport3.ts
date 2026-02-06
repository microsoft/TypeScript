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

// importFixes should only place the import in sorted position if the existing imports are sorted as specified,
//     otherwise the import should be placed at the end (regardless of if it's a regular or type-only import)
verify.importFixAtPosition([
`import { A, D, type B, type C } from './foo';
const b: B | C;
console.log(A, D);`],
    /*errorCode*/ undefined,
    { organizeImportsIgnoreCase: true, organizeImportsTypeOrder : "last" }
);

verify.importFixAtPosition([
`import { A, type B, type C, D } from './foo';
const b: B | C;
console.log(A, D);`],
    /*errorCode*/ undefined,
    { organizeImportsIgnoreCase: true, organizeImportsTypeOrder : "inline" }
);

verify.importFixAtPosition([
`import { A, type B, type C, D } from './foo';
const b: B | C;
console.log(A, D);`],
    /*errorCode*/ undefined,
    { organizeImportsIgnoreCase: true, organizeImportsTypeOrder : "first" }
    // `D` is added to the end since `A, type B, type C` is not sorted to "first"
);