/// <reference path='fourslash.ts' />

//// function foo () {
////     function bar () {
////         call(/*a*/item/*b*/.a, item.b)
////     }
////     const item = { a: 1, b: 2 }
//// }

goTo.select("a", "b");
verify.not.refactorAvailable("Introduce Destruction")
