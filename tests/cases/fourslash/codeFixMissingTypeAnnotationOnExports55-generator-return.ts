/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2015
//// export function *foo() {
////     yield 5;
//// }

verify.codeFix({
    description: "Add return type 'Generator<number, void, unknown>'",
    index: 0,
    newFileContent:
`export function *foo(): Generator<number, void, unknown> {
    yield 5;
}`
});
