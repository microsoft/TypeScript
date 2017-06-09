/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {
////   [| var x, y = 0,z = 1; |]
////    x+1;
////    z+1;
////}

verify.rangeAfterCodeFix("var x,z = 1;", /*includeWhiteSpace*/ undefined, /*errorCode*/ 6133);
