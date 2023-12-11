/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

// @Filename: /code.ts
////export class Cls {
////    set setOnly(value/*a*/) {  }
////}

goTo.marker("a");
verify.codeFix({
    description: "Add annotation of type 'any'",
    index: 0,
    newFileContent:
`export class Cls {
    set setOnly(value: any) {  }
}`
});