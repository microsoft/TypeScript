/// <reference path='fourslash.ts' />

////let a = { b: 0 };
////let x = { y: 0 };
/////*a*/a && a.b()/*b*/ && x && x.y();

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert && chain to optional chain expression",
    newContent:
`let a = { b: 0 };
let x = { y: 0 };
a?.b() && x && x.y();`
});