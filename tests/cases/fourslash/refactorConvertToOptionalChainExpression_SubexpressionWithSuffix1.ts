/// <reference path='fourslash.ts' />

////let a = { b: { c: 0 } };
////let foo;
////let bar;
/////*a*/a && a.b && a.b.c/*b*/ && foo && bar;

// verify that we stop at an invalid suffix sequence.
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`let a = { b: { c: 0 } };
let foo;
let bar;
a?.b?.c && foo && bar;`
});