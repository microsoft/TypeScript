/// <reference path='fourslash.ts' />

////let a = { b: { c: 0 } };
/////*a*/a && a.b ? a.b.c : "whenFalse";/*b*/

// We do not combine condition and whenTrue to an optional chain but should in the future.
goTo.select("a", "b");
verify.not.refactorAvailable("Convert to optional chain expression");