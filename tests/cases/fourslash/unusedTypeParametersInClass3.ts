/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[|class greeter<X, Y, Z> |] {
////    public a: X;
////    public b: Z;
////}

verify.rangeAfterCodeFix("class greeter<X, Z>");
