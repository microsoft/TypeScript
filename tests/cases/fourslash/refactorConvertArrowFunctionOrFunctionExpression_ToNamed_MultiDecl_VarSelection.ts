/// <reference path='fourslash.ts' />

//// let foo, /*x*/b/*y*/ar = a => 1 + a;

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to named function",
    actionDescription: "Convert to named function",
    newContent: `let foo;
function bar(a) {
    return 1 + a;
}
`,
});
