/// <reference path='fourslash.ts' />

//// function /*z*/square/*y*/() {
////     const arg = 2;
////     return arg*arg;
//// }
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
    const arg_1 = 2;
    const someValue = arg_1 * arg_1;
    return arg * someValue;
}`
});
