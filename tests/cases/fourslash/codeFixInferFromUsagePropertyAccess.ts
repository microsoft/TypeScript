/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function foo([|a, m, x |]) {
////    a.b.c;
////
////    var numeric = 0;
////    numeric = m.n();
////
////    x.y.z
////    x.y.z.push(0);
////    return x.y.z
////}

verify.rangeAfterCodeFix("a: { b: { c: any; }; }, m: { n: () => number; }, x: { y: { z: number[]; }; }", /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, /*index*/0);
