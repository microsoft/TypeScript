/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////
////export interface Foo<S = string, T = unknown, U = number> {}
////export function g(x: Foo<number, unknown, number>) { return x; }
////

verify.codeFix({
    description: "Add return type 'Foo<number>'",
    index: 0,
    newFileContent:
`
export interface Foo<S = string, T = unknown, U = number> {}
export function g(x: Foo<number, unknown, number>): Foo<number> { return x; }
`,
});