/// <reference path='fourslash.ts' />

////switch/*1*/ (10) {
////    case/*2*/ 1:
////    case/*3*/ 2:
////    case/*4*/ 4:
////    case/*5*/ 8:
////        foo: switch/*6*/ (20) {
////            case/*7*/ 1:
////            case/*8*/ 2:
////                break/*9*/;
////            default/*10*/:
////                break foo;
////        }
////    case/*11*/ 0xBEEF:
////    default/*12*/:
////        break/*13*/;
////    case 16/*14*/:
////}

function verifyOccurencesAtMarker(marker: string, count: number) {
    goTo.marker(marker);
    verify.occurrencesAtPositionCount(count);
}

verifyOccurencesAtMarker("1", 9);
verifyOccurencesAtMarker("2", 9);
verifyOccurencesAtMarker("3", 9);
verifyOccurencesAtMarker("4", 9);
verifyOccurencesAtMarker("5", 9);
verifyOccurencesAtMarker("6", 6);
verifyOccurencesAtMarker("7", 6);
verifyOccurencesAtMarker("8", 6);
verifyOccurencesAtMarker("9", 6);
verifyOccurencesAtMarker("10", 6);
verifyOccurencesAtMarker("11", 9);
verifyOccurencesAtMarker("12", 9);
verifyOccurencesAtMarker("13", 9);
verifyOccurencesAtMarker("14", 0);

