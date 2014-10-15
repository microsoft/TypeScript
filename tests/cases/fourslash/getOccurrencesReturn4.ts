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

function verifyOccurencesAtMarker(marker: string, count: number) {
    goTo.marker(marker);
    verify.occurrencesAtPositionCount(count);
}

verifyOccurencesAtMarker("1", 4);
verifyOccurencesAtMarker("2", 4);
verifyOccurencesAtMarker("3", 4);
verifyOccurencesAtMarker("4", 4);
verifyOccurencesAtMarker("5", 1);
verifyOccurencesAtMarker("6", 3);
verifyOccurencesAtMarker("7", 3);