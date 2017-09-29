/// <reference path='fourslash.ts' />
////declare class C {
////    m(): [|*|];
////}
verify.rangeAfterCodeFix("any");
