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

function verifyOccurrencesAtMarker(marker: string, count: number) {
    goTo.marker(marker);
    verify.occurrencesAtPositionCount(count);
}

verifyOccurrencesAtMarker("1", 9);
verifyOccurrencesAtMarker("2", 9);
verifyOccurrencesAtMarker("3", 9);
verifyOccurrencesAtMarker("4", 9);
verifyOccurrencesAtMarker("5", 9);
verifyOccurrencesAtMarker("6", 6);
verifyOccurrencesAtMarker("7", 6);
verifyOccurrencesAtMarker("8", 6);
verifyOccurrencesAtMarker("9", 6);
verifyOccurrencesAtMarker("10", 6);
verifyOccurrencesAtMarker("11", 9);
verifyOccurrencesAtMarker("12", 9);
verifyOccurrencesAtMarker("13", 9);
verifyOccurrencesAtMarker("14", 0);

