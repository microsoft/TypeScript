/// <reference path='fourslash.ts' />

////try/*1*/ {
////    try/*2*/ {
////    }
////    catch/*3*/ (x) {
////    }
////
////    try/*4*/ {
////    }
////    finally/*5*/ {/*8*/
////    }
////}
////catch/*6*/ (e) {
////}
////finally/*7*/ {
////}


for (var i = 1; i <= test.markers().length; i++) {
    goTo.marker("" + i);
    verify.occurrencesAtPositionCount(0);
}