/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @target: esnext

// @Filename: /foo.ts
//// export const A = 1;
//// export type B = { x: number };
//// export type C = 1;
//// export class D = { y: string };

// @Filename: /test.ts
//// import { A, D, type C } from './foo';
//// const b: B/**/ | C;
//// console.log(A, D);

goTo.marker("");

// importFixes should only place the import in sorted position if the existing imports are sorted as specified,
//     otherwise the import should be placed at the end 
verify.importFixAtPosition([
`import { A, D, type C, type B } from './foo';
const b: B | C;
console.log(A, D);`],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder: "inline" }
    // `type B` is added to the end since the existing imports are not sorted as specified
);

verify.importFixAtPosition([
`import { A, D, type B, type C } from './foo';
const b: B | C;
console.log(A, D);`],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder: "last" }
    // `type B` is added to the sorted position since the existing imports *are* sorted as specified
);

verify.importFixAtPosition([
`import { A, D, type C, type B } from './foo';
const b: B | C;
console.log(A, D);`],
    /*errorCode*/ undefined,
    { organizeImportsTypeOrder: "first" }
    // `type B` is added to the end (default behavior) since the existing imports are not sorted as specified
);