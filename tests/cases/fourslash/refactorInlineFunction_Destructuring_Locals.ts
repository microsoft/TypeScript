/// <reference path='fourslash.ts' />

//// function /*z*/square/*y*/() {
////     const { arg, val } = { arg: 0, val: 2 };
////     return arg * val;
//// }
//// function bar() {
////     const someValue = square();
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar() {
    const { arg, val } = { arg: 0, val: 2 };
    const someValue = arg * val;
}`
});
