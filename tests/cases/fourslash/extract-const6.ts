/// <reference path='fourslash.ts' />

// @filename: foo.ts
////const foo = /*a*/1 as number/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
`const newLocal = 1 as number;
const foo = /*RENAME*/newLocal;`
});
