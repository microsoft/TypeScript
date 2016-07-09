/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {
////    [| var x, y = 0; |]
////    x++;
////}

verify.codeFixAtPosition("var x;");
