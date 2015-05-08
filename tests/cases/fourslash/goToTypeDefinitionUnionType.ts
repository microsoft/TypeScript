/// <reference path='fourslash.ts' />

/////*definition0*/class C {
////    p;
////}
////
/////*definition1*/interface I {
////    x;
////}
////
////module M {
////    /*definition2*/export interface I {
////        y;
////    }
////}
////
////var x: C | I | M.I;
////
/////*reference*/x;

goTo.marker('reference');
goTo.type(0);
verify.caretAtMarker('definition0');

goTo.marker('reference');
goTo.type(1);
verify.caretAtMarker('definition1');

goTo.marker('reference');
goTo.type(2);
verify.caretAtMarker('definition2');
