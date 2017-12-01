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

goTo.eachRange(() => verify.occurrencesAtPositionCount(0));