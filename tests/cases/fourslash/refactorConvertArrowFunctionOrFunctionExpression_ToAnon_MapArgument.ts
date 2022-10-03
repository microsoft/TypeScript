/// <reference path='fourslash.ts' />

//// [9,8,7].map(/*x*/n/*y*/ => n + 418);

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to anonymous function",
    actionDescription: "Convert to anonymous function",
    newContent: `[9,8,7].map(function(n) {
        return n + 418;
    });`,
});
