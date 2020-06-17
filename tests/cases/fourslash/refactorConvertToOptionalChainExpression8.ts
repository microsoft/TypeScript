/// <reference path='fourslash.ts' />

////let a = { b: 0 };
////let x = { y: 0 };
////a && a.b && /*a*/x && x.y/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert && chain to optional chain expression",
    newContent:
`let a = { b: 0 };
let x = { y: 0 };
a && a.b && x?.y;`
});