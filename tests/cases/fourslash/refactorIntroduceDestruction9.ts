/// <reference path='fourslash.ts' />

//// enum E {
////     A,
////     B
//// }
//// /*a*/E/*b*/.A

goTo.select("a", "b");
verify.not.refactorAvailable("Introduce Destruction")
