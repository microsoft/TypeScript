/// <reference path='fourslash.ts' />

//// function /*z*/foo/*y*/() {
////     let num = 42;
////     num++;
////     return num;
//// }
//// function bar() {
////     const meaningOfLife = /*x*/foo/*w*/();
//// }

goTo.select("z", "y");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline all",
    actionDescription: "Inline all",
    newContent: `function bar() {
    let num = 42;
    num++;
    const meaningOfLife = num;
}`
});
