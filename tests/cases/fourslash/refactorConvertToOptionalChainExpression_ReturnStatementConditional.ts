/// <reference path='fourslash.ts' />

////let a = { b: { c: 0 } };
////function f(){
////    return /*a*/a.b ? a.b.c : "whenFalse"/*b*/;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`let a = { b: { c: 0 } };
function f(){
    return a.b?.c ?? "whenFalse";
}`
});