/// <reference path='fourslash.ts' />

////foo: [|switch|] (1) {
////    [|case|] 1:
////    [|case|] 2:
////        [|break|];
////    [|case|] 3:
////        switch (2) {
////            case 1:
////                [|break|] foo;
////                continue; // invalid
////            default:
////                break;
////        }
////    [|default|]:
////        [|break|];
////}

verify.baselineDocumentHighlights();
