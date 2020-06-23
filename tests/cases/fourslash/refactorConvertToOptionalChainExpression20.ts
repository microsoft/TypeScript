/// <reference path='fourslash.ts' />

////let a = { b: () => { return { c: 0 } } }
/////*a*/a && a.b && a.b().c/*b*/;

// We do not currently offer a refactor for this case but may want to in the future.
goTo.select("a", "b");
verify.not.refactorAvailable("Convert to optional chain expression");