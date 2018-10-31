/// <reference path='fourslash.ts' />

//// let foo = /*x*/(/*y*/): number => 42;

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to named function",
    actionDescription: "Convert to named function",
    newContent: `function foo(): number {
    return 42;
}`,
});
