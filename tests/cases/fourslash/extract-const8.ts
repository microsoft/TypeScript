/// <reference path='fourslash.ts' />

// @filename: foo.ts
////const foo = 1 * /*a*/(2 + 2)/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
`const newLocal = 2 + 2;
const foo = 1 * /*RENAME*/newLocal;`
});
