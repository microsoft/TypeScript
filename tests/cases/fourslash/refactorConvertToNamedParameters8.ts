/// <reference path='fourslash.ts' />

////function f(/*a*/a: number, b = 1/*b*/) {
////    return b;
////}
////f(2);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `function f({ a, b = 1 }: { a: number; b?: number; }) {
    return b;
}
f({ a: 2 });`
});