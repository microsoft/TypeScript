/// <reference path='fourslash.ts' />

// GH#35372

////function foo(bar?: number) {
////    /*a*/bar?.toString();/*b*/
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
`function foo(bar?: number) {
    const /*RENAME*/newLocal = bar?.toString();
}`
});
