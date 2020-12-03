/// <reference path='fourslash.ts' />

//// /*x*/let/*y*/ foo = a => 1 + a;

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to named function",
    actionDescription: "Convert to named function",
    newContent: `function foo(a) {
    return 1 + a;
}`,
});
