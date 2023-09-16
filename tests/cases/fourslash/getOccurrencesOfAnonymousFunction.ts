/// <reference path='fourslash.ts' />

////(function [|foo|](): number {
////    var x = [|foo|];
////    return 0;
////})

verify.baselineDocumentHighlights();
