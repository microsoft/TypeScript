/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// function f1 () {
////     [|for (const elem in ["a", "b", "c"]) |]{
////
////     }
//// }

verify.rangeAfterCodeFix(`for (const _elem in ["a", "b", "c"])`, /*includeWhiteSpace*/ true, /*errorCode*/ 0);
