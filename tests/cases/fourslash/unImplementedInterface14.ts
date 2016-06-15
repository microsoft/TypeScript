/// <reference path='fourslash.ts' />

////    interface I1 {
////        f1();
////        f2();
////    }
////
////
////    var x: I1 ={/*0*//*1*/
////        f2() {}
////    }

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "f1(){sys.newLine throw new Error('Method not Implemented');sys.newLine},sys.newLine" });
