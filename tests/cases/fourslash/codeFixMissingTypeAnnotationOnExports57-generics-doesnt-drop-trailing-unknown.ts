/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2015
////
////let x: unknown;
////export const s = new Set([x]);
////

verify.codeFix({
    description: "Add annotation of type 'Set<unknown>'",
    index: 0,
    newFileContent:
`
let x: unknown;
export const s: Set<unknown> = new Set([x]);
`,
});
