/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public readonly a: string = "foo";/*b*/
//// }

goTo.select("a", "b");
verify.not.refactorAvailable("Generate 'get' and 'set' accessors");