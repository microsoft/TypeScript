/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function foo([|x |]) {
////    return x.y.z
////}

verify.rangeAfterCodeFix("x: { y: { z: any; }; }");