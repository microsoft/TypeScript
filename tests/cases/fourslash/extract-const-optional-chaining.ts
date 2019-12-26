/// <reference path='fourslash.ts' />

////declare var bar: number | number
/////*a*/bar?.toString()/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
`declare var bar: number | number
const /*RENAME*/newLocal = bar?.toString();`
});
