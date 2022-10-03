/// <reference path='fourslash.ts' />

////class Foo {
////    /*a*/constructor/*b*/(a: number, b: number) { }
////}
////const fooAlias = Foo;
////const newFoo = new fooAlias(1, 2);

goTo.select("a", "b");
// Refactor should not make changes
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `class Foo {
    constructor(a: number, b: number) { }
}
const fooAlias = Foo;
const newFoo = new fooAlias(1, 2);`
});