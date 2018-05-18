/// <reference path='fourslash.ts' />

//// class A {
////     constructor(/*a*/a/*b*/: string) { }
//// }

goTo.select("a", "b");
verify.not.refactorAvailable("Generate 'get' and 'set' accessors");