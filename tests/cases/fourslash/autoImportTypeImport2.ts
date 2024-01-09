/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @target: esnext

// @Filename: /foo.ts
//// export const A = 1;
//// export type B = { x: number };
//// export type C = 1;
//// export class D = { y: string };

// @Filename: /test.ts
//// import { A, type C, D } from './foo';
//// const b: B/**/ | C;
//// console.log(A, D);

goTo.marker("");

// importFixes should only place the import in sorted position if the existing imports are sorted as specified,
//     otherwise the import should be placed at the end 
verify.importFixAtPosition([
`import { A, type B, type C, D } from './foo';
const b: B | C;
console.log(A, D);`],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder: "inline" }
);

verify.importFixAtPosition([
`import { A, type C, D, type B } from './foo';
const b: B | C;
console.log(A, D);`],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder: "last" }
);

verify.importFixAtPosition([
`import { A, type C, D, type B } from './foo';
const b: B | C;
console.log(A, D);`],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder: "first" }
);