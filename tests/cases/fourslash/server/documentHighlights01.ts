/// <reference path="../fourslash.ts"/>

// @Filename: a.ts
////function [|f|](x: typeof [|f|]) {
////    [|f|]([|f|]);
////}

verify.baselineDocumentHighlights();
