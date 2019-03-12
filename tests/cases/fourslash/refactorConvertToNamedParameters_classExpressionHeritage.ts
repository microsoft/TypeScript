/// <reference path='fourslash.ts' />

////const foo = class Foo {
////    /*a*/constructor/*b*/(a: number, b: number) { }
////}
////class Bar extends foo {
////    constructor() {
////        super(1, 2);
////    }
////}

goTo.select("a", "b");
// Refactor should not make changes
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `const foo = class Foo {
    constructor(a: number, b: number) { }
}
class Bar extends foo {
    constructor() {
        super(1, 2);
    }
}`
});