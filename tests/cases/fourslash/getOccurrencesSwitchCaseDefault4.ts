/// <reference path='fourslash.ts' />

////foo: [|switch|] (10) {
////    [|case|] 1:
////    [|case|] 2:
////    [|case|] 3:
////        [|break|];
////        [|break|] foo;
////        co/*1*/ntinue;
////        contin/*2*/ue foo;
////}

verify.baselineDocumentHighlights();
verify.baselineDocumentHighlights(test.markers());
