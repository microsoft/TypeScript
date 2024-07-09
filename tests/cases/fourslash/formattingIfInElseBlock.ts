/// <reference path='fourslash.ts' />

////if (true) {
////}
////else {
////    if (true) {
////        /*1*/
////}

goTo.marker("1");
edit.insert("}")
verify.currentLineContentIs("    }");
