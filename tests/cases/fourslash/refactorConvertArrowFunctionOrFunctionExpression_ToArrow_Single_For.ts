/// <reference path='fourslash.ts' />

//// const foo = /*x*/f/*y*/unction() {
////    for (let i = 0; i < 5; i++) { }
//// };

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to arrow function",
    actionDescription: "Convert to arrow function",
    newContent: `const foo = () => {
    for (let i = 0; i < 5; i++) { }
};`,
});
