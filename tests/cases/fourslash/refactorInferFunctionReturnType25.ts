/// <reference path='fourslash.ts' />

////function /*a*//*b*/f() {
////    return {
////        [-1]: 0
////    } as const
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Infer function return type",
    actionName: "Infer function return type",
    actionDescription: "Infer function return type",
    newContent:
`function f(): { readonly [-1]: 0; } {
    return {
        [-1]: 0
    } as const
}`
});
