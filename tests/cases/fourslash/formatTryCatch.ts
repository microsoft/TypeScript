/// <reference path="fourslash.ts"/>

////function test() {
////    /*try*/try {
////    }
////    /*catch*/catch (e) {
////    }
////}

// Running formatting multiple times should not affect the formatting of try/catch blocks
format.document();
format.document();
format.document();

goTo.marker("try");
verify.currentLineContentIs("    try {");

goTo.marker("catch");
verify.currentLineContentIs("    catch (e) {");
