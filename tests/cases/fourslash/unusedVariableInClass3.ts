/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter {/*0*/
////    private X = function() {};/*1*/
////}

verify.codeFixAtPosition(`
class greeter {
}`);
