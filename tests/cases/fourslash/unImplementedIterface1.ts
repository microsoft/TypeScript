/// <reference path='fourslash.ts' />

////namespace N1 {
////    class K {}
////    export interface I1 {
////        f1();
////        f2<T extends K>(str: string, num: number): T;
////        x: number;
////    }
////}/*0*//*1*/
////interface I1 {
////    f1();
////}
////
////    class C1 implements N1.I1 {
////    }

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "" });
