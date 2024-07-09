/// <reference path='fourslash.ts' />

//// let foo = /*x*/a/*y*/ => {
////    let b = 1;
////    return a + b;
//// };

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to named function",
    actionDescription: "Convert to named function",
    newContent: `function foo(a) {
    let b = 1;
    return a + b;
}`,
});
