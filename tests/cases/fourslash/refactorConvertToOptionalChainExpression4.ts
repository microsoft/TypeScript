/// <reference path='fourslash.ts' />

////let a = { b: { c: () => { } } };
/////*a*/a && a.b && a.b.c() === 1;/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`let a = { b: { c: () => { } } };
a?.b?.c() === 1;`
});