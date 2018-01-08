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

const [r0, r1, r2, r3] = test.ranges();
goTo.eachRange([r0, r2], () => verify.occurrencesAtPositionCount(0));
goTo.eachRange([r1, r3], () => verify.occurrencesAtPositionCount(1));
