/// <reference path='fourslash.ts' />

////    abstract class C1 {
////        abstract f1<T extends number>();
////    }
////
////    abstract class C2 extends C1 {
////
////    }
////
////    class C3 implements C2 {/*0*//*1*/
////        f2(){}
////    }


verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "f1<T extends number>(){sys.newLine throw new Error('Method not Implemented');sys.newLine}sys.newLine" });
