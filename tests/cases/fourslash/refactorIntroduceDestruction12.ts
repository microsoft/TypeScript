/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: 2
//// }
//// const key = "a"
//// call(/*a*/item/*b*/[key], item.b)

goTo.select("a", "b");
verify.not.refactorAvailable("Introduce Destruction")
