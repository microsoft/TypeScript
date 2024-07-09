/// <reference path='fourslash.ts' />

//// const foo = /*x*/a/*y*/ => {
////    // secret word
////    return a + 1;
////    /*
////    hidden msg
////    */
//// };

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to named function",
    actionDescription: "Convert to named function",
    newContent: `function foo(a) {
    // secret word
    return a + 1;
    /*
    hidden msg
    */
}`,
});
