/// <reference path='fourslash.ts' />

////class C {
////    p = 2
////}
////var c = new C()
////function f([|x, y |]) {
////    if (y) {
////        x = 1
////    }
////    return x
////}
////f(new C())


verify.rangeAfterCodeFix("x: number | C, y: undefined",/*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 1);
