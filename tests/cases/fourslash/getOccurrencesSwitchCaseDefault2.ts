/// <reference path='fourslash.ts' />

////switch (10) {
////    case 1:
////    case 2:
////    case 4:
////    case 8:
////        foo: [|switch|] (20) {
////            [|case|] 1:
////            [|case|] 2:
////                [|break|];
////            [|default|]:
////                [|break|] foo;
////        }
////    case 0xBEEF:
////    default:
////        break;
////    case 16:
////}

verify.baselineDocumentHighlights();
