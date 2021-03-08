/// <reference path='fourslash.ts' />

////class F1 {
////    /*a*//*b*/method() {
////        return { x: 1, y: 1 };
////    }
////}
////class F2 {
////    met/*c*//*d*/hod(){
////        return { x: 1, y: 1 };
////    }
////}
////class F3 {
////    method(/*e*//*f*/) {
////        return { x: 1, y: 1 };
////    }
////}
////class F4 {
////    method() {
////        return { x: 1, y: 1 /*g*//*h*/};
////    }
////}
////class F5 {
////    method() {
////        return { x: 1, y: 1 /*i*//*j*/};
////    }
////}

goTo.select("a", "b");
verify.refactorAvailable("Infer function return type");

goTo.select("c", "d");
verify.refactorAvailable("Infer function return type");

goTo.select("e", "f");
verify.refactorAvailable("Infer function return type");

goTo.select("g", "h");
verify.not.refactorAvailable("Infer function return type");

goTo.select("i", "j");
verify.not.refactorAvailable("Infer function return type");
