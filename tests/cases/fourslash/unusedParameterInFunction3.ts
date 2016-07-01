/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function greeter(/*0*/x,/*1*/y) {
////    y++;
////}

verify.codeFixAtPosition(`
function greeter(y) {
    y++;
}`);
