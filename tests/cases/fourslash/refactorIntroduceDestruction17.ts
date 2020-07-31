/// <reference path='fourslash.ts' />

//// interface A {
////     f: 1,
////     b: number
////     c: () => void
//// }
//// interface B {
////     f: 2,
////     b: number
////     c: () => string
//// }
//// declare const a: A | B
//// if (/*a*/a/*b*/.f === 1) {
////     a.b = 1
////     a.c()
//// } else {
////     a.b = 2
////     a.c()
//// }

goTo.select("a", "b");
verify.not.refactorAvailable("Introduce Destruction")
