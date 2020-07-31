/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: 2
//// }
//// call(/*a*/item.a/*b*/, item.b)

goTo.select("a", "b");
verify.not.refactorAvailable("Introduce Destruction")
