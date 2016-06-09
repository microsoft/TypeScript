/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters:true
////namespace Validation {
////    class c1 {
////
////    }
////
////    export class c2 {
////
////    }/*0*/
////
////    class c3 {
////        public x: c1;
////    }/*1*/
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "" });