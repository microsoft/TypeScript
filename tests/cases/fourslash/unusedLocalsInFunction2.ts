/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {
////    var x/*0*/, y = 0/*1*/;
////    x++;
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "" });
