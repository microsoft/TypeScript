/// <reference path="../fourslash.ts"/>

////foo: [|switch|] (10) {
////    [|case|] 1:
////    [|case|] 2:
////    [|case|] 3:
////        [|break|];
////        [|break|] foo;
////        continue;
////        continue foo;
////}

verify.baselineDocumentHighlights();
