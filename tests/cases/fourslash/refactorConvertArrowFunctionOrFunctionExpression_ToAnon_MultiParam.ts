/// <reference path='fourslash.ts' />

//// const foo = /*x*/(/*y*/a,b,c) => a + 1;

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to anonymous function",
    actionDescription: "Convert to anonymous function",
    newContent: `const foo = function(a, b, c) {
    return a + 1;
};`,
});
