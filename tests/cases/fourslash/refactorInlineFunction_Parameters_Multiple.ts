/// <reference path='fourslash.ts' />

//// function /*z*/mult/*y*/(arg0: number, arg1: number) { return arg0*arg1; }
//// function bar() {
////     const someValue = mult(21, 2);
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar() {
    const arg0 = 21;
    const arg1 = 2;
    const someValue = arg0 * arg1;
}`
});
