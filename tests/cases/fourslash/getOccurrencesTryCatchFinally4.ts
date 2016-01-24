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
function verifyOccurrencesAtMarker(marker: string, count: number) {
    goTo.marker(marker);
    verify.occurrencesAtPositionCount(count);
}

verifyOccurrencesAtMarker("1", 3);
verifyOccurrencesAtMarker("2", 2);
verifyOccurrencesAtMarker("3", 2);
verifyOccurrencesAtMarker("4", 2);
verifyOccurrencesAtMarker("5", 2);
verifyOccurrencesAtMarker("6", 3);
verifyOccurrencesAtMarker("7", 3);
verifyOccurrencesAtMarker("8", 0);