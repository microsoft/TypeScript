/// <reference path='fourslash.ts' />

//// const concat = /*x*/f/*y*/unction(a: string, b: string): string {
////    return a + b;
//// };

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to arrow function",
    actionDescription: "Convert to arrow function",
    newContent: `const concat = (a: string, b: string): string => a + b;`,
});
