/// <reference path='fourslash.ts' />

////function f(/*a*/a: number, b: string = "1"/*b*/): string {
////    return b;
////}
////f(4, "b");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `function f({ a, b = "1" }: { a: number; b?: string; }): string {
    return b;
}
f({ a: 4, b: "b" });`
});