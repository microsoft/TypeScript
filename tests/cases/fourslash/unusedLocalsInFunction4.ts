/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {
////    [| var  x,y = 0,z = 1; |]
////    y++;
////    z++;
////}

verify.rangeAfterCodeFix("var y = 0,z = 1;");
