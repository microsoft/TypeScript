/// <reference path='fourslash.ts' />

//// const /*x*/a/*y*/ = async () => { return 42; };

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to named function",
    actionDescription: "Convert to named function",
    newContent: `async function a() { return 42; }`,
});
