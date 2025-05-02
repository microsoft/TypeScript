/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019
//// export const a = Symbol();

verify.codeFix({
    description: "Add annotation of type 'unique symbol'",
    index: 0,
    newFileContent:
`export const a: unique symbol = Symbol();`
});
