/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {
////    var /*0*/ x,/*1*/ y = 0,z = 1;
////    y++;
////    z++;
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "" });
