/// <reference path='fourslash.ts' />

////let a = { b: 0 };
/////*a*/a ? a.b : "whenFalse";/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`let a = { b: 0 };
a?.b ?? "whenFalse";`
});