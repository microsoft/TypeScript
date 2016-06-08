/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function greeter(x/*0*/,y/*1*/,z) {
////    x++;
////    z++;
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "" });
