/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public/*b*/ /*c*/a/*d*/ = () => {
////         /*e*/return/*f*/ /*g*/1/*h*/;   
////     }
////     /*i*/b/*j*/: /*k*/number/*l*/ = /*m*/1/*n*/
//// };

goTo.select("a", "b");
verify.refactorAvailable("Generate 'get' and 'set' accessors");

goTo.select("c", "d");
verify.refactorAvailable("Generate 'get' and 'set' accessors");

goTo.select("e", "f");
verify.not.refactorAvailable("Generate 'get' and 'set' accessors");

goTo.select("g", "h");
verify.not.refactorAvailable("Generate 'get' and 'set' accessors");

goTo.select("i", "j");
verify.refactorAvailable("Generate 'get' and 'set' accessors");

goTo.select("k", "l");
verify.refactorAvailable("Generate 'get' and 'set' accessors");

goTo.select("m", "n");
verify.refactorAvailable("Generate 'get' and 'set' accessors");