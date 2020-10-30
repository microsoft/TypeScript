/// <reference path='fourslash.ts' />

////const a = {
////    b: { c: 1 }
////}
/////*a*/a && a.b && a.b['c']/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to optional chain expression",
    actionName: "Convert to optional chain expression",
    actionDescription: "Convert to optional chain expression",
    newContent:
`const a = {
    b: { c: 1 }
}
a?.b?.['c']`
});
