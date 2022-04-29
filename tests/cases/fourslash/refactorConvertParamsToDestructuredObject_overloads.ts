/// <reference path='fourslash.ts' />

////function f(a: number, b: number);
////function f(/*a*/a: number, b = 1/*b*/) {
////    return b;
////}
////f(2);

goTo.select("a", "b");
verify.not.refactorAvailable("Convert parameters to destructured object");