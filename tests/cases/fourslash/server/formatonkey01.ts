/// <reference path="../fourslash.ts"/>

// @lib: es5

////switch (1) {
////    case 1:
////        {
////            /*1*/
////        break;
////}

goTo.marker("1");
edit.insert("}");
verify.currentLineContentIs("        }");
