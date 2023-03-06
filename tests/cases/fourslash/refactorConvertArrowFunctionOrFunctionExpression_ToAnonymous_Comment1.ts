/// <reference path='fourslash.ts' />

////const foo = /*a*/()/*b*/ => /**
//// * comment
//// */
////1

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to anonymous function",
    actionDescription: "Convert to anonymous function",
    newContent: `const foo = function() {
    /**
     * comment
     */
    return 1;
}`
});
