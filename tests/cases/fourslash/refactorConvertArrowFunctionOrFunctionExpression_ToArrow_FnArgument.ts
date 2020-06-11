/// <reference path='fourslash.ts' />

//// function foo(lambda){}
//// foo(function /*x*/is/*y*/Even(n) {
////    return n % 2 === 0;
//// });

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to arrow function",
    actionDescription: "Convert to arrow function",
    newContent: `function foo(lambda){}
foo((n) => n % 2 === 0);`,
});
