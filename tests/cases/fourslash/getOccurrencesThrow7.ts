/// <reference path='fourslash.ts' />

////try {
////    [|throw|] 10;
////
////    try {
////        throw 10;
////    }
////    catch (x) {
////        [|throw|] 10;
////    }
////    finally {
////        [|throw|] 10;
////    }
////}
////finally {
////    [|throw|] 10;
////}
////
////[|throw|] 10;

verify.baselineDocumentHighlights();
