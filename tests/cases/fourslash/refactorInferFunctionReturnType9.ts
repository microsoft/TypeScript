/// <reference path='fourslash.ts' />

////function /*a*/foo<T>/*b*/() {
////    return 1 as T;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Infer function return type",
    actionName: "Infer function return type",
    actionDescription: "Infer function return type",
    newContent:
`function foo<T>(): T {
    return 1 as T;
}`
});
