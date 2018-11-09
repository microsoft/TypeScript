/// <reference path='fourslash.ts' />

//// let isFoo = /*x*/(/*y*/n: number): boolean => n === 42;

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to named function",
    actionDescription: "Convert to named function",
    newContent: `function isFoo(n: number): boolean {
    return n === 42;
}`,
});
