/// <reference path='fourslash.ts' />

//// const f = (item: { a: 1, b: 2}) => /*a*/item/*b*/.a + item.b

goTo.select("a", "b");
verify.not.refactorAvailable("Introduce destruction")

