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

function verifyOccurrencesAtMarker(marker: string, count: number) {
    goTo.marker(marker);
    verify.occurrencesAtPositionCount(count);
}

verifyOccurrencesAtMarker("1", 7);
verifyOccurrencesAtMarker("2", 2);
verifyOccurrencesAtMarker("3", 2);
verifyOccurrencesAtMarker("4", 2);
verifyOccurrencesAtMarker("5", 2);
verifyOccurrencesAtMarker("6", 1);
verifyOccurrencesAtMarker("7", 1);
verifyOccurrencesAtMarker("8", 7);
verifyOccurrencesAtMarker("9", 7);
verifyOccurrencesAtMarker("10", 7);
verifyOccurrencesAtMarker("11", 7);
verifyOccurrencesAtMarker("12", 7);
verifyOccurrencesAtMarker("13", 7);
