/// <reference path='fourslash.ts' />

////interface Foo {
////    x: number;
////}
////function f(x: number): Foo;
////function f(x: string): number;
////function /*a*/f/*b*/(x: string | number) {
////    return x === 1 ? 1 : { x };
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Infer function return type",
    actionName: "Infer function return type",
    actionDescription: "Infer function return type",
    newContent:
`interface Foo {
    x: number;
}
function f(x: number): Foo;
function f(x: string): number;
function f(x: string | number): number | Foo {
    return x === 1 ? 1 : { x };
}`
});
