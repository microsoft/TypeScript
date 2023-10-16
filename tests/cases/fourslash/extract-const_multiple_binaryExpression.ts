/// <reference path='fourslash.ts' />

// @filename: foo.ts
////function foo() {
////    const /*a*/a = 1 + "test"/*b*/;
////    const b = 1 + "test";
////    return a + b;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_1",
    actionDescription: "Extract to constant in global scope",
    newContent:
        `const newLocal = 1 + "test";
function foo() {
    const a = newLocal;
    const b = /*RENAME*/newLocal;
    return a + b;
}`
});
