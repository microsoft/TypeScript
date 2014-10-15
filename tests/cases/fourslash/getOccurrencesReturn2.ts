/// <reference path='fourslash.ts' />

////function f(a: number) {
////    if (a > 0) {
////        return (function () {
////            [|return|];
////            [|ret/**/urn|];
////            [|return|];
////
////            while (false) {
////                [|return|] true;
////            }
////        })() || true;
////    }
////
////    var unusued = [1, 2, 3, 4].map(x => { return 4 })
////
////    return;
////    return true;
////}

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