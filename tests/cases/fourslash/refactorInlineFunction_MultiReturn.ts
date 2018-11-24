/// <reference path='fourslash.ts' />

//// function /*z*/foo/*y*/() {
////     const x = 2;
////     if (x < 0) return 42;
////     else return 69;
//// }
//// function bar(arg: number) {
////     const someValue = foo();
////     return arg * someValue;
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar(arg: number) {
    let returnValue;
    const x = 2;
    if (x < 0)
        returnValue = 42;
    else
        returnValue = 69;
    const someValue = returnValue;
    return arg * someValue;
}`
});
