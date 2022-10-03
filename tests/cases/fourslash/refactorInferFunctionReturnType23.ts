/// <reference path='fourslash.ts' />

////const foo = async /*a*//*b*/(a) => {
////    return 1;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Infer function return type",
    actionName: "Infer function return type",
    actionDescription: "Infer function return type",
    newContent:
`const foo = async (a): Promise<number> => {
    return 1;
}`
});
