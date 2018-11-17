/// <reference path='fourslash.ts' />

//// function /*z*/square/*y*/(arg: number) { return arg*arg; }
//// function bar() {
////     const someValue = square(2);
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar() {
    const arg = 2;
    const someValue = arg * arg;
}`
});
