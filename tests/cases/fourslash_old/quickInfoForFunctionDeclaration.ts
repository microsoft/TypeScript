/// <reference path='fourslash.ts' />

////interface A<T> { }
////
////function ma/*makeA*/keA<T>(t: T): A<T> { return null; }
////
////function f/*f*/<T>(t: T) {
////    return makeA(t);
////}
////
////var x = f(0);
////var y = makeA(0);



goTo.marker("makeA");
verify.quickInfoIs("<T>(t: T): A<T>", undefined, "makeA", "function");

goTo.marker("f");
verify.quickInfoIs("<T>(t: T): A<T>", undefined, "f", "function");
