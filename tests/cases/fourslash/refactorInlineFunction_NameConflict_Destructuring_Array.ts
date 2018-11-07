/// <reference path='fourslash.ts' />

//// function /*z*/square/*y*/([arg, val]) { return arg * val; }
//// function bar(arg: number, val: number) {
////     const someValue = square([0, 2]);
////     return (arg + val) * someValue;
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar(arg: number, val: number) {
    const [arg_1, val_1] = [0, 2];
    const someValue = arg_1 * val_1;
    return (arg + val) * someValue;
}`
});
