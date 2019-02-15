/// <reference path='fourslash.ts' />

////const c = class {
////    constructor(/*a*/a: number, b = { x: 1 }/*b*/) { }
////}
////var x = new c(2);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `const c = class {
    constructor({ a, b = { x: 1 } }: { a: number; b?: { x: number; }; }) { }
}
var x = new c({ a: 2 });`
});
