/// <reference path='fourslash.ts' />

////function f1(/*a*//*b*/x, { y }) {
////    return { x, y: 1 };
////}
////function f2(x, { /*c*//*d*/y }) {
////    return { x, y: 1 };
////}
////function f3(x, /*e*//*f*/{ y }) {
////    return { x, y: 1 };
////}

goTo.select("a", "b");
verify.refactorAvailable("Infer function return type");

goTo.select("c", "d");
verify.refactorAvailable("Infer function return type");

goTo.select("e", "f");
verify.refactorAvailable("Infer function return type");
