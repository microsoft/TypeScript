/// <reference path='fourslash.ts' />

//// function doSomething(a){}
//// doSomething(/*x*/(/*y*/) => 1 + 1);

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to anonymous function",
    actionDescription: "Convert to anonymous function",
    newContent: `function doSomething(a){}
doSomething(function() {
        return 1 + 1;
    });`,
});
