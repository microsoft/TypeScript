/// <reference path='fourslash.ts' />

////try {
////    try {
////    }
////    catch (x) {
////    }
////
////    [|t/*1*/r/*2*/y|] {
////    }
////    [|finall/*3*/y|] {
////    }
////}
////catch (e) {
////}
////finally {
////}

verify.baselineDocumentHighlights(test.markers());