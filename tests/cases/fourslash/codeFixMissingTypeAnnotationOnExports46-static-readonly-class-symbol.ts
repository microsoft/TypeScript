/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

// @Filename: /code.ts
////class A {
////    static readonly p1 = Symbol();
////}
verify.codeFix({
    description: "Add annotation of type 'unique symbol'",
    index: 0,
    newFileContent:
`class A {
    static readonly p1: unique symbol = Symbol();
}`
});