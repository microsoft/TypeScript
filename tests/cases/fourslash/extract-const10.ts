/// <reference path='fourslash.ts' />

// @filename: foo.ts
////function foo() {
////    /*a*/const a = [1]/*b*/;
////    return a;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_1",
    actionDescription: "Extract to constant in global scope",
    newContent:
`const newLocal = [1];
function foo() {
    const a = /*RENAME*/newLocal;
    return a;
}`
});
