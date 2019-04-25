/// <reference path='fourslash.ts' />

////const c = class {
////    constructor(/*a*/a: number, b = { x: 1 }/*b*/) { }
////}
////var x = new c(2);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `const c = class {
    constructor({ a, b = { x: 1 } }: { a: number; b?: { x: number; }; }) { }
}
var x = new c({ a: 2 });`
});
