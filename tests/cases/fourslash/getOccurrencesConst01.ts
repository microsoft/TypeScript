/// <reference path='fourslash.ts' />

////[|const|] enum E1 {
////    v1,
////    v2
////}
////
/////*2*/const c = 0;

verify.baselineDocumentHighlights();
verify.baselineDocumentHighlights("2");
