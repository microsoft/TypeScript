/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function greeter(/*0*/ x/*1*/) {
////}

verify.codeFixAtPosition(`
function greeter() {
}`);
