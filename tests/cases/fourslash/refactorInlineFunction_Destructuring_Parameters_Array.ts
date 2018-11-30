/// <reference path='fourslash.ts' />

//// function /*z*/square/*y*/([arg, val]) { return arg * val; }
//// function bar() {
////     const someValue = square([0, 2]);
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar() {
    const [arg, val] = [0, 2];
    const someValue = arg * val;
}`
});
