/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public get a/*b*/ () { return 1; }
////     /*c*/public set a/*d*/ (v) { }
////     /*e*/public ['b']/*f*/ () { }
////     /*g*/public ['c'] = 1;/*h*/
//// }

goTo.select("a", "b");
verify.not.refactorAvailable("Generate 'get' and 'set' accessors");

goTo.select("c", "d");
verify.not.refactorAvailable("Generate 'get' and 'set' accessors");

goTo.select("e", "f");
verify.not.refactorAvailable("Generate 'get' and 'set' accessors");

goTo.select("g", "h");
verify.not.refactorAvailable("Generate 'get' and 'set' accessors");