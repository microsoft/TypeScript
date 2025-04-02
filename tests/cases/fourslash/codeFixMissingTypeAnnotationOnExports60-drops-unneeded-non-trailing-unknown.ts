/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
////
////export interface Foo<S = string, T = unknown> {}
////export function f(x: Foo<string, unknown>) { return x; }
////

verify.codeFix({
    description: "Add return type 'Foo'",
    index: 0,
    newFileContent:
`
export interface Foo<S = string, T = unknown> {}
export function f(x: Foo<string, unknown>): Foo { return x; }
`,
});