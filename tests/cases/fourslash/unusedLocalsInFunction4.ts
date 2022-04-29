/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {
////    [| var  x,y = 0,z = 1; |]
////    use(y, z);
////}

verify.rangeAfterCodeFix("var y = 0,z = 1;", /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);
