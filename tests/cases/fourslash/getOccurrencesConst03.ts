/// <reference path='fourslash.ts' />

////module m {
////    export /*1*/const x;
////    export [|const|] enum E {
////    }
////}
////
////export /*2*/const x;
////export [|const|] enum E {
////}

goTo.eachRange(() => verify.occurrencesAtPositionCount(1)); // They are in different scopes, so not counted together.
goTo.eachMarker(() => verify.occurrencesAtPositionCount(0));