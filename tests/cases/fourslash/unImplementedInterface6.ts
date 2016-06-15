/// <reference path='fourslash.ts' />

////    interface I1 {
////        f1(x: number, y: T);
////    }
////
////    class T {}
////
////    class C1 implements I1 {/*0*//*1*/
////    }

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "f1(x: number, y: T){sys.newLine throw new Error('Method not Implemented');sys.newLine}sys.newLine" });
