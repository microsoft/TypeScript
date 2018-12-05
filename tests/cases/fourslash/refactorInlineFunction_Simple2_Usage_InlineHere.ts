/// <reference path='fourslash.ts' />

//// function /*z*/foo/*y*/() {
////     let num = 42;
////     num++;
////     return num;
//// }
//// function bar() {
////     const meaningOfLife = /*x*/foo/*w*/();
//// }

goTo.select("x", "w");
edit.applyRefactor({
    refactorName: "Inline function",
    actionName: "Inline here",
    actionDescription: "Inline here",
    newContent: `function foo() {
    let num = 42;
    num++;
    return num;
}
function bar() {
    let num = 42;
    num++;
    const meaningOfLife = num;
}`
});
