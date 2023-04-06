/// <reference path='fourslash.ts' />

/////*1*/[|try|] {
////    try {
////    }
////    catch (x) {
////    }
////
////    try {
////    }
////    finally {
////    }
////}
////[|cat/*2*/ch|] (e) {
////}
////[|fina/*3*/lly|] {
////}

verify.baselineDocumentHighlights(test.markers());
