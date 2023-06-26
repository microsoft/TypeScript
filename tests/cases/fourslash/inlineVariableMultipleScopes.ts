/// <reference path="fourslash.ts" />

////let /*a*/x/*b*/ = 1;
////function foo() {
////    console.log(x);
////}
////const y = x + 2;

goTo.select("a", "b");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: `function foo() {
    console.log(1);
}
const y = 1 + 2;`
});