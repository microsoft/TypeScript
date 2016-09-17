/// <reference path='fourslash.ts' />

////interface A<T> { }
////
////function ma/*makeA*/keA<T>(t: T): A<T> { return null; }
////
////function /*f*/f<T>(t: T) {
////    return makeA(t);
////}
////
////var x = f(0);
////var y = makeA(0);

verify.quickInfos({
    makeA: "function makeA<T>(t: T): A<T>",
    f: "function f<T>(t: T): A<T>"
});
