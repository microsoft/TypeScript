/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {
////    [| var x, y = 0; |]
////    x+1;
////}

verify.rangeAfterCodeFix("var x;");
