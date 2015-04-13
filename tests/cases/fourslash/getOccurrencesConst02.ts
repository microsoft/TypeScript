/// <reference path='fourslash.ts' />

////module m {
////    declare [|const|] x;
////    declare [|const|] enum E {
////    }
////}
////
////declare [|const|] x;
////declare [|const|] enum E {
////}

test.ranges().forEach(range => {
    goTo.position(range.start);
    verify.occurrencesAtPositionCount(0);
});