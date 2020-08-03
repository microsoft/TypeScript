/// <reference path='fourslash.ts' />

////let a = { b: { c: 0 } };
////let foo;
////let bar;
////foo && bar && /*a*/a && a.b && a.b.c;/*b*/

// verify that we stop at an invalid prefix sequence.
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`let a = { b: { c: 0 } };
let foo;
let bar;
foo && bar && a?.b?.c;`
});