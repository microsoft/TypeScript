/// <reference path='fourslash.ts' />

////const x = [1,2,3].map(/*a*/function (x) { return x + 1 }/*b*/);

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
`const newLocal = function(x: number): number { return x + 1; };
const x = [1,2,3].map(/*RENAME*/newLocal);`
});
