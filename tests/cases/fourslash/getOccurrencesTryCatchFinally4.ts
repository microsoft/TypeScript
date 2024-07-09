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
verify.baselineDocumentHighlights(test.markers());