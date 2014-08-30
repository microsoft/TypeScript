/// <reference path='fourslash.ts' />

////try {
////    [|t/*1*/r/*2*/y|] {
////    }
////    [|c/*3*/atch|] (x) {
////    }
////
////    try {
////    }
////    finally {
////    }
////}
////catch (e) {
////}
////finally {
////}


for (var i = 1; i <= test.markers().length; i++) {
    goTo.marker("" + i);
    verify.occurrencesAtPositionCount(2);

    test.ranges().forEach(range => {
        verify.occurrencesAtPositionContains(range, false);
    });
}