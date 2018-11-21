/// <reference path='fourslash.ts' />

//// function /*z*/foo/*y*/() {
////     const x = 2;
////     if (x < 0) return 42;
////     else return 69;
//// }
//// function bar(arg: number) {
////     const returnValue = arg * foo();
////     return returnValue;
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar(arg: number) {
    let returnValue1;
    const x = 2;
    if (x < 0) returnValue1 = 42;
    else returnValue1 = 69;
    const returnValue = arg * returnValue1;
    return returnValue;
}`
});
