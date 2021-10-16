/// <reference path='fourslash.ts' />

////const foo = /*a*/()/*b*/ => {
////    return { x: 1, y: 1 };
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Infer function return type",
    actionName: "Infer function return type",
    actionDescription: "Infer function return type",
    newContent:
`const foo = (): { x: number; y: number; } => {
    return { x: 1, y: 1 };
}`
});
