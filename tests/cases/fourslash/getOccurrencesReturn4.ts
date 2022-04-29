/// <reference path='fourslash.ts' />

////function f(a: number) {
////    if (a > 0) {
////        return (function () {
////            return/*1*/;
////            return/*2*/;
////            return/*3*/;
////
////            if (false) {
////                return/*4*/ true;
////            }
////        })() || true;
////    }
////
////    var unusued = [1, 2, 3, 4].map(x => { return/*5*/ 4 })
////
////    return/*6*/;
////    return/*7*/ true;
////}

function verifyOccurrencesAtMarker(marker: string, count: number) {
    goTo.marker(marker);
    verify.occurrencesAtPositionCount(count);
}

verifyOccurrencesAtMarker("1", 4);
verifyOccurrencesAtMarker("2", 4);
verifyOccurrencesAtMarker("3", 4);
verifyOccurrencesAtMarker("4", 4);
verifyOccurrencesAtMarker("5", 1);
verifyOccurrencesAtMarker("6", 3);
verifyOccurrencesAtMarker("7", 3);