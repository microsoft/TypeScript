/// <reference path='fourslash.ts' />

////function f(/*a*/a: number, b = { x: 1, z: { s: true } }/*b*/) {
////    return b;
////}
////f(2);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `function f({ a, b = { x: 1, z: { s: true } } }: { a: number; b?: { x: number; z: { s: boolean; }; }; }) {
    return b;
}
f({ a: 2 });`
});