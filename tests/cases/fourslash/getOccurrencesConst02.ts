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

verify.baselineDocumentHighlights(); // They are in different scopes, so not counted together.
verify.baselineDocumentHighlights(test.markers());