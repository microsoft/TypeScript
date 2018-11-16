/// <reference path='fourslash.ts' />

//// const knife = "sharp";
//// {
////     function foo() { return knife; }
//// }
//// function bar() { const meaningOfLife = foo(); }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar() { const meaningOfLife = knife; }`
});
