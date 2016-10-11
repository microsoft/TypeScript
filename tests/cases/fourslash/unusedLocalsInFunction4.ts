/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {
////    [| var  x,y = 0,z = 1; |]
////    y++;
////    z++;
////}

verify.codeFixAtPosition("var y = 0,z = 1;");
