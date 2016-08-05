/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////[|class greeter<X, Y> |] {
////    public a: X;
////}

verify.codeFixAtPosition("class greeter<X>");