/// <reference path='fourslash.ts' />

//// let foo = /*x*/(/*y*/a,b,c) => a + 1;

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to named function",
    actionDescription: "Convert to named function",
    newContent: `function foo(a, b, c) {
    return a + 1;
}`,
});
