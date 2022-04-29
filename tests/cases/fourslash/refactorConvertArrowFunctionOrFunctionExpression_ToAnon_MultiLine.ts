/// <reference path='fourslash.ts' />

//// const foo = /*x*/a/*y*/ => {
////    let b = 1;
////    return a + b;
//// };

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to anonymous function",
    actionDescription: "Convert to anonymous function",
    newContent: `const foo = function(a) {
    let b = 1;
    return a + b;
};`,
});
