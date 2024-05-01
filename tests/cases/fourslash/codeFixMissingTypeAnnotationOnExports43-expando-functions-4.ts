/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

// @Filename: /code.ts
////function foo(): void {}
////// cannot name this property because it's an invalid variable name.
////foo["@bar"] = 42;
////foo.x = 1;

verify.codeFix({
  description: "Annotate types of properties expando function in a namespace",
  index: 0,
  newFileContent:
`function foo(): void {}
declare namespace foo {
    export var x: number;
}
// cannot name this property because it's an invalid variable name.
foo["@bar"] = 42;
foo.x = 1;`
});
