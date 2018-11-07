/// <reference path='fourslash.ts' />

//// function /*z*/foo/*y*/() {
////     const arg = 2;
////     if (arg < 0) return 42 + arg;
////     else return arg;
//// }
//// function bar(arg: number) {
////     return arg * foo();
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar(arg: number) {
    let returnValue;
    const arg_1 = 2;
    if (arg_1 < 0)
        returnValue = 42 + arg_1;
    else
        returnValue = arg_1;
    return arg * returnValue;
}`
});
