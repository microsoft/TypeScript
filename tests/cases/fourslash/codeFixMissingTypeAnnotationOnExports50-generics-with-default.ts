/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2015
////let x: Iterator<number>;
////export const y = x;

verify.codeFix({
    description: "Add annotation of type 'Iterator<number>'",
    index: 0,
    newFileContent:
`let x: Iterator<number>;
export const y: Iterator<number> = x;`,
});
