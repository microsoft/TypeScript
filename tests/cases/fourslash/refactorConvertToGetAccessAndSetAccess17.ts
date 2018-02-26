/// <reference path='fourslash.ts' />

//// class A {
////     public _a: number = 1;
////     /*a*/public a: string = "foo";/*b*/
////     public b: number = 2;
////     /*c*/public _b: string = "foo";/*d*/
//// }

goTo.select("a", "b");
verify.not.refactorAvailable("Generate 'get' and 'set' accessors");