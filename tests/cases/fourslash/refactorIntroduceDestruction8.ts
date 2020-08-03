/// <reference path='fourslash.ts' />

//// const item = {
////     a: 1, b: () => void
//// }
//// /*a*/item/*b*/.a = 2
//// call(item.a, /*c*/item/*d*/.b(), (((/*e*/item/*f*/.b)))())

goTo.select("a", "b");
verify.not.refactorAvailable("Introduce destruction")
goTo.select("c", "d");
verify.not.refactorAvailable("Introduce destruction")
goTo.select("e", "f");
verify.not.refactorAvailable("Introduce destruction")
