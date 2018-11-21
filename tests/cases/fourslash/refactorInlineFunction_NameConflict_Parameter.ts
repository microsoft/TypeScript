/// <reference path='fourslash.ts' />

//// function /*z*/square/*y*/(arg: number) { return arg*arg; }
//// function bar(arg: number) {
////     const someValue = square(2);
////     return arg * someValue;
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar(arg: number) {
    const arg1 = 2;
    const someValue = arg1*arg1;
    return arg * someValue;
}`
});
