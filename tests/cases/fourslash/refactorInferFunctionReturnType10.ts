/// <reference path='fourslash.ts' />

////function /*a*/foo/*b*/(x: number) {
////    return x ? x : x > 1;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Infer function return type",
    actionName: "Infer function return type",
    actionDescription: "Infer function return type",
    newContent:
`function foo(x: number): number | boolean {
    return x ? x : x > 1;
}`
});
