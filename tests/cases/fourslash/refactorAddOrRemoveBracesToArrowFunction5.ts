/// <reference path='fourslash.ts' />

//// const foo = /*a*/a/*b*/ => { return { a: 1 }; };

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Add or remove braces in an arrow function",
    actionName: "Remove braces from arrow function",
    actionDescription: "Remove braces from arrow function",
    newContent: `const foo = a => ({ a: 1 });`,
});
