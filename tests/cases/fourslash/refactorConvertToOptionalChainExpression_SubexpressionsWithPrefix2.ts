/// <reference path='fourslash.ts' />

////let a = { b: 0 };
////let x = { y: 0 };
////a && a.b && /*a*/x && x.y;/*b*/

// Verify that we stop at a prefix sequence that is otherwise valid.
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`let a = { b: 0 };
let x = { y: 0 };
a && a.b && x?.y;`
});