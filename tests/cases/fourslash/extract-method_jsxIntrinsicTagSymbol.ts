/// <reference path='fourslash.ts' />

// @Filename: /a.tsx

// Test that we don't get `unknownSymbol`, which causes a crash when we try getting its declarations.

/////*a*/<div></div>/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent: "const /*RENAME*/newLocal = <div></div>;",
});
