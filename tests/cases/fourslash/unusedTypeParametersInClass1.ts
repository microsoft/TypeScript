/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////class greeter/*0*/<T>/*1*/ {
////}

verify.codeFixAtPosition(`
class greeter {
}`);
