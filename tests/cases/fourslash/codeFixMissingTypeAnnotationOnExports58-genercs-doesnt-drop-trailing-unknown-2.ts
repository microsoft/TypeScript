/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2015
////
////export const s = new Set<unknown>();
////

verify.codeFix({
    description: "Add annotation of type 'Set<unknown>'",
    index: 0,
    newFileContent:
`
export const s: Set<unknown> = new Set<unknown>();
`,
});
