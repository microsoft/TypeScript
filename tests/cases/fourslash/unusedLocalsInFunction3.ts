/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {
////   [| var x, y = 0,z = 1; |]
////    x++;
////    z++;
////}

verify.codeFixAtPosition("var x,z = 1;", 6133);
