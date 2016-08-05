/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[|class greeter<X, Y, Z> |] {
////    public a: X;
////    public b: Z;
////}

verify.codeFixAtPosition("class greeter<X, Z>");
