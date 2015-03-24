/// <reference path='fourslash.ts' />

////module m {
////    export [|const|] x;
////    export [|const|] enum E {
////    }
////}
////
////export [|const|] x;
////export [|const|] enum E {
////}

test.ranges().forEach(range => {
    goTo.position(range.start);
    verify.occurrencesAtPositionCount(0);
});