/// <reference path='fourslash.ts' />

/////*a*/()/*b*/ => {
////    return {} satisfies any
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Add or remove braces in an arrow function",
    actionName: "Remove braces from arrow function",
    actionDescription: "Remove braces from arrow function",
    newContent: "() => ({} satisfies any)",
});
