/// <reference path='fourslash.ts' />

/////*a*/a && a.b && a.b()/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`a?.b?.();`
});