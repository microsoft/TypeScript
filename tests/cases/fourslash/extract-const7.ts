/// <reference path='fourslash.ts' />

// @filename: foo.ts
////const foo = /*a*/<number>1/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
`const newLocal = <number>1;
const foo = /*RENAME*/newLocal;`
});
