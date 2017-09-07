// @strict: true
/// <reference path='fourslash.ts' />
////class C {
////    p: [|*|]
////}
verify.rangeAfterCodeFix("any", /*includeWhiteSpace*/ false, /*errorCode*/ 8020, 0);
