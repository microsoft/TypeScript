/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////[|function greeter(x,y,z) |] {
////    x++;
////    z++;
////}

verify.codeFixAtPosition("function greeter(x,z)");