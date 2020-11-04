/// <reference path='fourslash.ts' />

//// const foo = /*x*/(/*y*/) => 1 + 1;

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to anonymous function",
    actionDescription: "Convert to anonymous function",
    newContent: `const foo = function() {
    return 1 + 1;
};`,
});
