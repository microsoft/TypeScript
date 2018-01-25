/// <reference path='fourslash.ts' />

////class Greeter3 {
////    stop() {
////        /*2*/var s = "hello\
////"/*1*/
////    }
////}

goTo.marker("1");
edit.insert("\n");
// We actually need to verify smart (virtual) identation here rather than actual identation. Fourslash support is required.
verify.indentationIs(8);
goTo.marker("2");
verify.currentLineContentIs("        var s = \"hello\\");