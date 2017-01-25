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

verify.rangesAreOccurrences(false);

goTo.marker();
for (const range of test.ranges()) {
    verify.occurrencesAtPositionContains(range, false);
}
