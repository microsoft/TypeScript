/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[|class greeter<X, Y> |] {
////    public a: X;
////}

verify.rangeAfterCodeFix("class greeter<X>", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);