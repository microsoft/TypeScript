/// <reference path='fourslash.ts' />

/////*1*/[|try|] {
////    try {
////    }
////    catch (x) {
////    }
////
////    try {
////    }
////    finally {
////    }
////}
////[|cat/*2*/ch|] (e) {
////}
////[|fina/*3*/lly|] {
////}

for (var i = 1; i <= test.markers().length; i++) {
    goTo.marker("" + i);
    verify.occurrencesAtPositionCount(3);

    test.ranges().forEach(range => {
        verify.occurrencesAtPositionContains(range, false);
    });
}
