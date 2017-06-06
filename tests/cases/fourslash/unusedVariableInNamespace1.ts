/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    [|let a = "dummy entry";|]
////}

verify.rangeAfterCodeFix("", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
