/// <reference path='fourslash.ts' />

//// /*a*/const moveMe = 1;/*b*/

goTo.select("a", "b");
verify.refactorKindAvailable("refactor.move",
[
    "refactor.move.newFile",
    "refactor.move.file"
],
{ 
    allowTextChangesInNewFiles: true
});
