/// <reference path='fourslash.ts' />

// @filename: foo.ts
////function foo(i, b) {
////    const bar = (...a) => a;
////    /*a*/const a = bar("test", i++, !b, ...[1, 2, 3])/*b*/;
////    const b = bar("test", i++, !b, ...[1, 2, 3]);
////    return a + b;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
        `function foo(i, b) {
    const bar = (...a) => a;
    const newLocal = bar("test", i++, !b, ...[1, 2, 3]);
    const a = /*RENAME*/newLocal;
    const b = newLocal;
    return a + b;
}`
});
