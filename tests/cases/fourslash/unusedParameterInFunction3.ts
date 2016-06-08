/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function greeter(/*0*/x,/*1*/y) {
////    y++;
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "" });
