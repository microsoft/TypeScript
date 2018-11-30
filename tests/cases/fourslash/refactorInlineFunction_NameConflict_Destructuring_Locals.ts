/// <reference path='fourslash.ts' />

//// function /*z*/square/*y*/() {
////     const { arg, val } = { arg: 0, val: 2 };
////     return arg * val;
//// }
//// function bar(arg: number, val: number) {
////     const someValue = square();
////     return (arg + val) * someValue;
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar(arg: number, val: number) {
    const { arg: arg_1, val: val_1 } = { arg: 0, val: 2 };
    const someValue = arg_1 * val_1;
    return (arg + val) * someValue;
}`
});
