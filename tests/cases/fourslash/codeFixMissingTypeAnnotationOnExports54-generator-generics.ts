/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2015
//// export function foo(x: Generator<number>) {
////     return x;
//// }

verify.codeFix({
    description: "Add return type 'Generator<number>'",
    index: 0,
    newFileContent:
`export function foo(x: Generator<number>): Generator<number> {
    return x;
}`
});
