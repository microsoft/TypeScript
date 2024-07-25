/// <reference path='fourslash.ts' />

////class /*definition0*/C {
////    p;
////}
////
////interface /*definition1*/I {
////    x;
////}
////
////module M {
////    export interface /*definition2*/I {
////        y;
////    }
////}
////
////var x: C | I | M.I;
////
/////*reference*/x;

verify.baselineGoToType("reference");
