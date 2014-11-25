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
function verifyOccurencesAtMarker(marker: string, count: number) {
    goTo.marker(marker);
    verify.occurrencesAtPositionCount(count);
}

verifyOccurencesAtMarker("1", 3);
verifyOccurencesAtMarker("2", 2);
verifyOccurencesAtMarker("3", 2);
verifyOccurencesAtMarker("4", 2);
verifyOccurencesAtMarker("5", 2);
verifyOccurencesAtMarker("6", 3);
verifyOccurencesAtMarker("7", 3);
verifyOccurencesAtMarker("8", 0);