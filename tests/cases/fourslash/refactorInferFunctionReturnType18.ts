/// <reference path='fourslash.ts' />

////const f1 = /*a*//*b*/function () {
////    return { x: 1, y: 1 };
////}
////const f2 = func/*c*//*d*/tion() {
////    return { x: 1, y: 1 };
////}
////const f3 = function (/*e*//*f*/) {
////    return { x: 1, y: 1 };
////}
////const f4 = function () {/*g*//*h*/
////    return { x: 1, y: 1 };
////}
////const f5 = function () {
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
