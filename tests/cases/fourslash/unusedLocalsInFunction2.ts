/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {
////    var x/*0*/, y = 0/*1*/;
////    x++;
////}

verify.codeFixAtPosition(`
function greeter() {
    var x;
    x++;
}`);
