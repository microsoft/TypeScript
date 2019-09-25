/// <reference path='fourslash.ts' />

////declare function fnUnion(fn: <T>(a: T) => T): void
////fnUnion(/*a*/a => a/*b*/);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
`declare function fnUnion(fn: <T>(a: T) => T): void
const newLocal: <T>(a: T) => T = a => a;
fnUnion(/*RENAME*/newLocal);`
});