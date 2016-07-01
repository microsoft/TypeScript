/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {
////    var x/*0*/, y = 0/*1*/,z = 1;
////    x++;
////    z++;
////}

verify.codeFixAtPosition(`
function greeter() {
    var x,z = 1;
    x++;
    z++;
}`);
