/// <reference path='fourslash.ts' />

////let a = { b: { c: 0 } };
////a && a.b && /*a*//*b*/a.b.c;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert && chain to optional chain expression",
    newContent:
`let a = { b: { c: 0 } };
a?.b?.c;`,
    triggerReason: "invoked"
});