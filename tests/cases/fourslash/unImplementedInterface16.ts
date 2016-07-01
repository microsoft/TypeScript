/// <reference path='fourslash.ts' />

////    interface I1 {
////        x:string;
////    }
////
////
////    var x: I1 ={/*0*//*1*/
////    }

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: 'x : "" sys.newLine' });
