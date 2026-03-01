/// <reference path='fourslash.ts' />

////if/*1*/ (true) {
////    if/*2*/ (false) {
////    }
////    else/*3*/ {
////    }
////    if/*4*/ (true) {
////    }
////    else/*5*/ {
////        if/*6*/ (false)
////            if/*7*/ (true)
////                var x = undefined;
////    }
////}
////else/*8*/            if (null) {
////}
////else/*9*/ /* whar garbl */ if/*10*/ (undefined) {
////}
////else/*11*/
////if/*12*/ (false) {
////}
////else/*13*/ { }

verify.baselineDocumentHighlights(test.markers());