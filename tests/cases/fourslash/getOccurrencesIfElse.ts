/// <reference path='fourslash.ts' />

////[|if|] (true) {
////    if (false) {
////    }
////    else {
////    }
////    if (true) {
////    }
////    else {
////        if (false)
////            if (true)
////                var x = undefined;
////    }
////}
////[|else            i/**/f|] (null) {
////}
////[|else|] /* whar garbl */ [|if|] (undefined) {
////}
////[|else|]
////[|if|] (false) {
////}
////[|else|] { }

test.ranges().forEach(r => {
    goTo.position(r.start);

    test.ranges().forEach(range => {
        verify.occurrencesAtPositionContains(range, false);
    });
});

goTo.marker();
test.ranges().forEach(range => {
    verify.occurrencesAtPositionContains(range, false);
});