/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////[|function greeter(x,y,z) |] {
////    x++;
////    z++;
////}

verify.rangeAfterCodeFix("function greeter(x,z)");