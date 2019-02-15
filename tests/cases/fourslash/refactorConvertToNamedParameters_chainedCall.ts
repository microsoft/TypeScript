/// <reference path='fourslash.ts' />

////function foo(/*a*/a: number, b: number/*b*/) {
////    return { bar: () => a + b };
////}
////var x = foo(1, 2).bar();

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `function foo({ a, b }: { a: number; b: number; }) {
    return { bar: () => a + b };
}
var x = foo({ a: 1, b: 2 }).bar();`
});