/// <reference path='fourslash.ts' />

////module m {
////    declare /*1*/const x;
////    declare [|const|] enum E {
////    }
////}
////
////declare /*2*/const x;
////declare [|const|] enum E {
////}

goTo.eachRange(() => verify.occurrencesAtPositionCount(1)); // They are in different scopes, so not counted together.
goTo.eachMarker(() => verify.occurrencesAtPositionCount(0));
