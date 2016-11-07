/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {
////   [| var x, y = 0,z = 1; |]
////    x+1;
////    z+1;
////}

verify.codeFixAtPosition("var x,z = 1;", 6133);
