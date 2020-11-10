/// <reference path='fourslash.ts' />

////let a = { b: { c: { d: { e: {f: 0} } } } };
/////*a*/a.b && a.b.c.d && a.b.c.d.e.f;/*b*/

// Only convert the accesses for which existence is checked.
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`let a = { b: { c: { d: { e: {f: 0} } } } };
a.b?.c.d?.e.f;`
});