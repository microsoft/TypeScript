/// <reference path='fourslash.ts' />

////switch (1) {
////    case 1:
////        {
////            /*1*/
////        break;
////}

goTo.marker("1");
edit.insert("}");
verify.currentLineContentIs("        }");
