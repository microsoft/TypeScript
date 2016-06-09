/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters:true
////class greeter {
////    constructor() {/*0*/
////        var unused = 20;/*1*/
////    }
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "" });
