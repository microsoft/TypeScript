/// <reference path='fourslash.ts' />

//// [4,5,6,7].map(function /*x*/is/*y*/Even(n) {
////    return n % 2 === 0;
//// });

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to arrow function",
    actionDescription: "Convert to arrow function",
    newContent: `[4,5,6,7].map((n) => n % 2 === 0);`,
});
