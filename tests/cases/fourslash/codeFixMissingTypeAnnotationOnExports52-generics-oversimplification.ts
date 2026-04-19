/// <reference path='fourslash.ts'/>

// In the abstract, we might prefer the inferred return type annotation to
// be identical to the parameter type (with 2 type parameters).
// Our current heuristic to avoid overly complex types in this case creates
// "overly simple" types, but this tradeoff seems reasonable.

// @isolatedDeclarations: true
// @declaration: true
////export interface Foo<T, U = T[]> {}
////export function foo(x: Foo<string, string[]>) {
////    return x;
////}

verify.codeFix({
    description: "Add return type 'Foo<string>'",
    index: 0,
    newFileContent:
`export interface Foo<T, U = T[]> {}
export function foo(x: Foo<string, string[]>): Foo<string> {
    return x;
}`,
});
