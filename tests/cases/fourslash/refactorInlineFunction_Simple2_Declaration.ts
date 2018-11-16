/// <reference path='fourslash.ts' />

//// function /*z*/foo/*y*/() {
////     const num = 42;
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
    const num = 42;
    const meaningOfLife = num;
}`
});
