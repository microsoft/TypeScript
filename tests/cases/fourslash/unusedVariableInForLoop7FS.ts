/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function f1 () [|{
////    for (const elem of ["a", "b", "c"]) {
////        elem;
////        var x = 20;
////    }
////}|]
////

verify.rangeAfterCodeFix(`{
    for (const elem of ["a", "b", "c"]) {
        elem;
    }
}`, /*includeWhiteSpace*/ true);
