/// <reference path="../fourslash.ts"/>

////foo: [|switch|] (10) {
////    [|case|] 1:
////    [|case|] 2:
////    [|case|] 3:
////        [|break|];
////        [|break|] foo;
////        continue;
////        continue foo;
////}

let ranges = test.ranges();

for (let r of ranges) {
    goTo.position(r.start);
    verify.occurrencesAtPositionCount(ranges.length);

    for (let range of ranges) {
        verify.occurrencesAtPositionContains(range, /*isWriteAccess*/ false);
    }
}