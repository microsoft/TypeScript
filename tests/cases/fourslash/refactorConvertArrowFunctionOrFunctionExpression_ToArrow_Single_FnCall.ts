/// <reference path='fourslash.ts' />

//// function s(){}
//// const foo = /*x*/f/*y*/unction() {
////    s();
//// };

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to arrow function",
    actionDescription: "Convert to arrow function",
    newContent: `function s(){}
const foo = () => {
    s();
};`,
});
