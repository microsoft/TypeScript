/// <reference path='fourslash.ts' />

////function /*a*//*b*/f1() {
////    return { x: 1, y: 1 };
////}
////func/*c*//*d*/tion f2() {
////    return { x: 1, y: 1 };
////}
////function f3(/*e*//*f*/) {
////    return { x: 1, y: 1 };
////}
////function f4() {/*g*//*h*/
////    return { x: 1, y: 1 };
////}
////function f5() {
////    return { x: 1, y: 1 /*i*//*j*/};
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
