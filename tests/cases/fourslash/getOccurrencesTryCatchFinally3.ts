/// <reference path='fourslash.ts' />

////try {
////    try {
////    }
////    catch (x) {
////    }
////
////    [|t/*1*/r/*2*/y|] {
////    }
////    [|finall/*3*/y|] {
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