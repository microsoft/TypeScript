/// <reference path='fourslash.ts' />

//// let bar;
//// const foo = /*x*/f/*y*/unction() {
////    bar = 42;
//// };

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to arrow function",
    actionDescription: "Convert to arrow function",
    newContent: `let bar;
const foo = () => {
    bar = 42;
};`,
});
