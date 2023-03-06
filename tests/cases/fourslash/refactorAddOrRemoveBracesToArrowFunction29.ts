/// <reference path='fourslash.ts' />

////const a = /*a*/()/*b*/ => {
////    return {} as {}
////};

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Add or remove braces in an arrow function",
    actionName: "Remove braces from arrow function",
    actionDescription: "Remove braces from arrow function",
    newContent: `const a = () => ({} as {});`,
});
