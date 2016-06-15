/// <reference path='fourslash.ts' />

////    interface I1 {
////        x:boolean;
////    }
////
////
////    var x: I1 ={/*0*//*1*/
////    }

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "x : false sys.newLine" });
