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

verify.baselineCommands(
    { type: "documentHighlights" }, // They are in different scopes, so not counted together.
    { type: "documentHighlights", markerOrRange: test.markers() },
);