/// <reference path='fourslash.ts' />

////const x = /*a*/0/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
`const newLocal = 0;
const x = /*RENAME*/newLocal;`
});
