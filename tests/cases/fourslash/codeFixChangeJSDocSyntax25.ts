/// <reference path='fourslash.ts' />
////declare class C {
////    p: [|*|];
////}
verify.rangeAfterCodeFix("any");
