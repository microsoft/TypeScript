/// <reference path='fourslash.ts' />

////[|const|] enum E1 {
////    v1,
////    v2
////}
////
/////*2*/const c = 0;

verify.baselineCommands(
    { type: "documentHighlights" },
    { type: "documentHighlights", markerOrRange: "2" }
);