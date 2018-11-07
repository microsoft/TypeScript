/// <reference path='fourslash.ts' />

//// function /*z*/foo/*y*/() { return 42; }
//// function bar() { const meaningOfLife = /*x*/foo/*w*/(); }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar() { const meaningOfLife = 42; }`
});
