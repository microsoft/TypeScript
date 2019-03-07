/// <reference path='fourslash.ts' />

////class Foo {
////    /*a*/constructor/*b*/(a: number, b: number) { }
////}
////const fooAlias = Foo;
////const newFoo = new fooAlias(1, 2);

goTo.select("a", "b");
// Refactor should not make changes
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `class Foo {
    constructor(a: number, b: number) { }
}
const fooAlias = Foo;
const newFoo = new fooAlias(1, 2);`
});