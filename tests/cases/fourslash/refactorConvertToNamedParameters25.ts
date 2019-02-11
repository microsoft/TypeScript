/// <reference path='fourslash.ts' />

////function /*a*/foo/*b*/(a: number, b: number) { /** missing */
////    return a + b;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `function foo({ a, b }: { a: number; b: number; }) { /** missing */
    return a + b;
}`
});