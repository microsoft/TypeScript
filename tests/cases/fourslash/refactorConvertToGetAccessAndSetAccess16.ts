/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public readonly a: string = "foo";/*b*/
////     /*c*/public static a: string = "foo";/*d*/
//// }

goTo.select("a", "b");
verify.not.refactorAvailable("Generate 'get' and 'set' accessors");