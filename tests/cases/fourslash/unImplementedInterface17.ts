/// <reference path='fourslash.ts' />

////    interface I1 {
////        x:number;
////    }
////
////
////    var x: I1 ={/*0*//*1*/
////    }

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "x : 0 sys.newLine" });
