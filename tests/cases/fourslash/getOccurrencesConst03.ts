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

verify.baselineDocumentHighlights(); // They are in different scopes, so not counted together.
verify.baselineDocumentHighlights(test.markers());