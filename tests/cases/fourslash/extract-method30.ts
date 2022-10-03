/// <reference path='fourslash.ts' />

/////*a*/console.log(0) //
////console.log(0)/*b*/

format.setFormatOptions({ ...format.copyFormatOptions(), semicolons: ts.SemicolonPreference.Ignore });
goTo.select("a", "b");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_0",
  actionDescription: "Extract to function in global scope",
  newContent:
`/*RENAME*/newFunction()

function newFunction() {
    console.log(0) //
    console.log(0)
}
`
});
