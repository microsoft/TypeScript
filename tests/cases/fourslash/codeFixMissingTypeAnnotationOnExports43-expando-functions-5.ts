/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

// @Filename: /code.ts
////function foo(): void {}
////// x already exists, so do not generate code for 'x'
////foo.x = 1;
////foo.y = 1;
////namespace foo {
////  export let x = 42;
////}

verify.codeFix({
  description: "Annotate types of properties expando function in a namespace",
  index: 0,
  newFileContent:
`function foo(): void {}
declare namespace foo {
    export var y: number;
}
// x already exists, so do not generate code for 'x'
foo.x = 1;
foo.y = 1;
namespace foo {
  export let x = 42;
}`
});
