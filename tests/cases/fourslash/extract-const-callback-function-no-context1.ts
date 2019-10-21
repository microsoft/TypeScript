/// <reference path='fourslash.ts' />

////declare function fnUnion(fn: ((a: number) => number) | ((a: string) => string)): void
////fnUnion(/*a*/(a: any) => a/*b*/);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
`declare function fnUnion(fn: ((a: number) => number) | ((a: string) => string)): void
const newLocal = (a: any) => a;
fnUnion(/*RENAME*/newLocal);`
});
