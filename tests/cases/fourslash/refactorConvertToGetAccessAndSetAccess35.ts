/// <reference path='fourslash.ts' />

//// class A {
////     /*a*/public/*b*/ /*c*/a/*d*/ = () => {
////         /*e*/return/*f*/ /*g*/1/*h*/;   
////     }
////     /*i*/b/*j*/: /*k*/number/*l*/ = /*m*/1/*n*/
////     /*o*/public /*p*/ c: number = 1; /*q*/
////     /*r*/d = 1
////     /*s*/public e/*t*/ = /*u*/ 1
////     f = 1/*v*/ /*w*/
////     g = 1/*x*/
//// };

goTo.select("a", "b");
verify.not.refactorAvailable();

goTo.select("c", "d");
verify.refactorAvailable("Generate 'get' and 'set' accessors");

goTo.select("e", "f");
verify.not.refactorAvailable();

goTo.select("g", "h");
verify.not.refactorAvailable();

goTo.select("i", "j");
verify.not.refactorAvailable();

goTo.select("k", "l");
verify.not.refactorAvailable();

goTo.select("m", "n");
verify.not.refactorAvailable();

goTo.select("o", "p");
verify.not.refactorAvailable();

goTo.select("q", "r");
verify.not.refactorAvailable();

goTo.select("s", "t");
verify.refactorAvailable("Generate 'get' and 'set' accessors");

goTo.select("u", "v");
verify.not.refactorAvailable();

goTo.select("w", "x");
verify.refactorAvailable("Generate 'get' and 'set' accessors");
