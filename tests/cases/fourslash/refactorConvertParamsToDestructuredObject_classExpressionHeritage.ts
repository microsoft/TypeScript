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
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `const foo = class Foo {
    constructor(a: number, b: number) { }
}
class Bar extends foo {
    constructor() {
        super(1, 2);
    }
}`
});