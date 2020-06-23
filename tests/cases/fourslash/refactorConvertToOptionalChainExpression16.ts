/// <reference path='fourslash.ts' />

////let a = { b: { c: 0 } };
////let foo;
/////*a*/foo && a && a.b && a.b.c;/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`let a = { b: { c: 0 } };
let foo;
foo && a?.b?.c;`
});