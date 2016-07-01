/// <reference path='fourslash.ts' />

////    namespace N1 {
////        export interface I1 {
////            f1(x: number, y: string)
////        }
////    }
////    interface I1 {
////        f1();
////    }
////
////    class C1 implements N1.I1 {/*0*//*1*/
////    }

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "f1(x: number,y: string){sys.newLine throw new Error('Method not Implemented');sys.newLine}sys.newLine" });
