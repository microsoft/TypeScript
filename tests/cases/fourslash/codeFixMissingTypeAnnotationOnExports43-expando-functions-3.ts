/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

// @Filename: /code.ts
////function foo(): void {}
////foo.x = 1;
////foo.y = 1;

verify.codeFix({
    description: "Annotate types of properties expando function in a namespace",
    index: 0,
    newFileContent:
`function foo(): void {}
declare namespace foo {
    export var x: number;
    export var y: number;
}
foo.x = 1;
foo.y = 1;`
});
