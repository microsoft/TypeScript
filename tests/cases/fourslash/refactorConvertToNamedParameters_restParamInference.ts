/// <reference path='fourslash.ts' />

////function log(/*a*/a: number, b: number, ...args/*b*/) { }
////let l = log(-1, -2, 3, 4, 5);
////let k = log(1, 2);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `function log({ a, b, args = [] }: { a: number; b: number; args?: any[]; }) { }
let l = log({ a: -1, b: -2, args: [3, 4, 5] });
let k = log({ a: 1, b: 2 });`
});