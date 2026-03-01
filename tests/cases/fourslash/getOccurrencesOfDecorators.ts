/// <reference path='fourslash.ts' />

// @Filename: b.ts
////@/*1*/decorator
////class C {
////    @decorator
////    method() {}
////}
////function decorator(target) {
////    return target;
////}

verify.baselineDocumentHighlights("1");
