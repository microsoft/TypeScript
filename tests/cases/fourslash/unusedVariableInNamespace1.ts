/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {/*0*/
////    let a = "dummy entry";/*1*/
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "" });
