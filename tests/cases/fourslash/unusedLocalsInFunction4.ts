/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {
////    var /*0*/ x,/*1*/ y = 0,z = 1;
////    y++;
////    z++;
////}

verify.codeFixAtPosition(`
function greeter() {
    var y = 0,z = 1;
    y++;
    z++;
}`);
