/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {/*0*/
////    private X = function() {};/*1*/
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "" });
