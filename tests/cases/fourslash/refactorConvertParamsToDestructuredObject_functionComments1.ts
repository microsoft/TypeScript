/// <reference path='fourslash.ts' />

////function /*a*/foo/*b*/(a: number /** a */, b: number /** b */) {
////    return a + b;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `function foo({ a, b }: { a: number /** a */; b: number /** b */; }) {
    return a + b;
}`
});