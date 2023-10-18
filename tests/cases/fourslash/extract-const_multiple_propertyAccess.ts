/// <reference path='fourslash.ts' />

// @filename: foo.ts
////function foo() {
////    return /*a*/foo.name.length/*b*/ + foo.name.length;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_1",
    actionDescription: "Extract to constant in global scope",
    newContent:
        `const length = foo.name.length;
function foo() {
    return /*RENAME*/length + length;
}`
});
