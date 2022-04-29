/// <reference path='fourslash.ts' />

////let a = { b: 0 };
////let x = { b: 0 };
/////*a*/a && x && a.b && x.y;/*b*/

// We don't currently offer a refactor for this case but should add it in the future.
goTo.select("a", "b");
verify.not.refactorAvailable("Convert to optional chain expression");