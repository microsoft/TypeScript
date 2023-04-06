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

verify.baselineCommands(
    { type: "documentHighlights" }, // They are in different scopes, so not counted together.
    { type: "documentHighlights", markerOrRange: test.markers() },
);