/// <reference path='fourslash.ts' />

////    namespace N1 {
////        export interface I1 {
////            x: number;
////        }
////    }
////    interface I1 {
////        f1();
////    }
////
////    class C1 implements N1.I1 {/*0*//*1*/
////    }

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "x: number;sys.newLine" });
