/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function greeter(x/*0*/,y/*1*/) {
////    x++;
////}

verify.codeFixAtPosition(`
function greeter(x) {
    x++;
}`);
