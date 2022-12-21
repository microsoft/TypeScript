/// <reference path='fourslash.ts' />

//// const increment = /*x*/(/*y*/a: number): number => a + 1;

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to anonymous function",
    actionDescription: "Convert to anonymous function",
    newContent: `const increment = function(a: number): number {
    return a + 1;
};`,
});
