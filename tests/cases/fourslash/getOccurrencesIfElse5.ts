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

function verifyOccurencesAtMarker(marker: string, count: number) {
    goTo.marker(marker);
    verify.occurrencesAtPositionCount(count);
}

verifyOccurencesAtMarker("1", 7);
verifyOccurencesAtMarker("2", 2);
verifyOccurencesAtMarker("3", 2);
verifyOccurencesAtMarker("4", 2);
verifyOccurencesAtMarker("5", 2);
verifyOccurencesAtMarker("6", 1);
verifyOccurencesAtMarker("7", 1);
verifyOccurencesAtMarker("8", 7);
verifyOccurencesAtMarker("9", 7);
verifyOccurencesAtMarker("10", 7);
verifyOccurencesAtMarker("11", 7);
verifyOccurencesAtMarker("12", 7);
verifyOccurencesAtMarker("13", 7);
