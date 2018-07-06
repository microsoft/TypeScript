/// <reference path='fourslash.ts' />

//// const foo = /*a*/a/*b*/ => { return; };

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Add or remove braces in an arrow function",
    actionName: "Remove braces from arrow function",
    actionDescription: "Remove braces from arrow function",
    newContent: `const foo = a => void 0;`,
});
