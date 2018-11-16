/// <reference path='fourslash.ts' />

//// function /*z*/foo/*y*/() { return 42; }
//// function bar() { const meaningOfLife = /*x*/foo/*w*/(); }

goTo.select("x", "w");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline here",
    actionDescription: "Inline here",
    newContent: `function bar() { const meaningOfLife = 42; }`
});
