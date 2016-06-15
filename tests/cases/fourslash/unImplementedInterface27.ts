/// <reference path='fourslash.ts' />

////    interface I1 {
////        x:T;
////        f1();
////    }
////
////    class T {}
////
////
////    var x: I1 ={/*0*//*1*/
////        f1(){}
////    }

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "x : null,sys.newLine" });
