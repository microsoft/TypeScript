/// <reference path="../fourslash.ts"/>

// @lib: es5

// @Filename: a.ts
////function [|f|](x: typeof [|f|]) {
////    [|f|]([|f|]);
////}

verify.baselineDocumentHighlights();
