/// <reference path='fourslash.ts' />

//// const item = {
////     "a-a-a": 1, b: 2
//// }
//// call(/*a*/item/*b*/["a-a-a"], item.b)

goTo.select("a", "b");
verify.not.refactorAvailable("Introduce destruction")
