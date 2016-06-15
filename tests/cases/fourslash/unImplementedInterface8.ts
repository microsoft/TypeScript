/// <reference path='fourslash.ts' />

////    interface I1 {
////        f1<T extends string>(x: number, y: C2);
////    }
////
////    class C2 {}
////
////    class C1 implements I1 {/*0*//*1*/
////    }

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "f1<T extends string>(x: number, y: C2){sys.newLine throw new Error('Method not Implemented');sys.newLine}sys.newLine" });
