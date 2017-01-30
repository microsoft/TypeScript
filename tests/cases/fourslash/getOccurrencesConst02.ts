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

goTo.eachRange(() => verify.occurrencesAtPositionCount(0));
