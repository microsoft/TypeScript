/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true

////export interface Foo<T, U = T[]> {}
////export function foo(x: Foo<string>) {
////    return x;
////}

verify.codeFix({
    description: "Add return type 'Foo<string>'",
    index: 0,
    newFileContent:
`export interface Foo<T, U = T[]> {}
export function foo(x: Foo<string>): Foo<string> {
    return x;
}`,
});
