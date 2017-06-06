/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {
////    [| var x, y = 0; |]
////    x+1;
////}

verify.rangeAfterCodeFix("var x;", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
