/// <reference path='fourslash.ts' />

////function f(/*a*/a: number, b = { x: 1, z: { s: true } }/*b*/) {
////    return b;
////}
////f(2);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `function f({ a, b = { x: 1, z: { s: true } } }: { a: number; b?: { x: number; z: { s: boolean; }; }; }) {
    return b;
}
f({ a: 2 });`
});