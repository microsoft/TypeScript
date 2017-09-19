/// <reference path='fourslash.ts' />
////class C {
////    p: [|*|] = 12;
////}
verify.rangeAfterCodeFix("any");
