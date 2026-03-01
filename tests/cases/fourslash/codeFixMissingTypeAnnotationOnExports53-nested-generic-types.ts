/// <reference path='fourslash.ts'/>

// Our current heursitic to avoid overly verbose generic types
// doesn't handle generic types nested inside other types.

// @isolatedDeclarations: true
// @declaration: true
////export interface Foo<T, U = T[]> {}
////export function foo(x: Map<number, Foo<string>>) {
////    return x;
////}

verify.codeFix({
    description: "Add return type 'Map<number, Foo<string, string[]>>'",
    index: 0,
    newFileContent:
`export interface Foo<T, U = T[]> {}
export function foo(x: Map<number, Foo<string>>): Map<number, Foo<string, string[]>> {
    return x;
}`,
});
