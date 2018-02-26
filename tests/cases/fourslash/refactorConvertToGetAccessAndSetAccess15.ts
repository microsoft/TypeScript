/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public "a": string = "foo";/*b*/
////     /*c*/public get b/*d*/ () { return 1; }
////     /*e*/public set b/*f*/ (v) { }
//// }

goTo.select("a", "b");
verify.not.refactorAvailable("Generate 'get' and 'set' accessors");

goTo.select("c", "d");
verify.not.refactorAvailable("Generate 'get' and 'set' accessors");

goTo.select("e", "f");
verify.not.refactorAvailable("Generate 'get' and 'set' accessors");