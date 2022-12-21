/// <reference path='fourslash.ts' />

//// let foo = /*x*/(/*y*/) => 1 + 1;

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to named function",
    actionDescription: "Convert to named function",
    newContent: `function foo() {
    return 1 + 1;
}`,
});
