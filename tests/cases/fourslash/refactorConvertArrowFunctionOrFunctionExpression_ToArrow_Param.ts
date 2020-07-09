/// <reference path='fourslash.ts' />

//// const foo = /*x*/f/*y*/unction(a, b, c) {
////    return a + b + c;
//// };

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to arrow function",
    actionDescription: "Convert to arrow function",
    newContent: `const foo = (a, b, c) => a + b + c;`,
});
