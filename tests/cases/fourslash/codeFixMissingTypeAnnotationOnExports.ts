/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////function foo() { return 42; }
////export const g = foo();

verify.codeFix({
    description: "Add annotation of type 'number'",
    index: 0,
    newFileContent:
`function foo() { return 42; }
export const g: number = foo();`,
});
