/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[|class greeter<X, Y> |] {
////    public a: X;
////}

verify.rangeAfterCodeFix("class greeter<X>");