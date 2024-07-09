/// <reference path='fourslash.ts' />

//// const foo = /*x*/f/*y*/unction() {
////    return 42;
//// };

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to arrow function",
    actionDescription: "Convert to arrow function",
    newContent: `const foo = () => 42;`,
});
