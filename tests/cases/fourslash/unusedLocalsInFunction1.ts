/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////function greeter() {/*0*/
////    var x = 0;/*1*/
////}

verify.codeFixAtPosition(`
function greeter() {
}`);
