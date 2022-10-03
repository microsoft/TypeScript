/// <reference path='fourslash.ts' />

//// const foo = /*a*/a/*b*/ => ({ a: 1 });

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Add or remove braces in an arrow function",
    actionName: "Add braces to arrow function",
    actionDescription: "Add braces to arrow function",
    newContent: `const foo = a => {
    return ({ a: 1 });
};`,
});
