/// <reference path='fourslash.ts' />

////function f(/*a*/a?: number, b: string = "1"/*b*/): string {
////    return b;
////}
////f();

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `function f({ a, b = "1" }: { a?: number; b?: string; } = {}): string {
    return b;
}
f();`
});