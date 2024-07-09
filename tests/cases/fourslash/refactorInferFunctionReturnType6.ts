/// <reference path='fourslash.ts' />

////function /*a*/foo/*b*/() {
////    return "";
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Infer function return type",
    actionName: "Infer function return type",
    actionDescription: "Infer function return type",
    newContent:
`function foo(): string {
    return "";
}`
});
