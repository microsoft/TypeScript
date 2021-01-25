/// <reference path='fourslash.ts' />

////function /*a*/foo/*b*/() {
////    const bar = 1 as any;
////    return bar;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Infer function return type",
    actionName: "Infer function return type",
    actionDescription: "Infer function return type",
    newContent:
`function foo(): any {
    const bar = 1 as any;
    return bar;
}`
});
