/// <reference path='fourslash.ts' />

////class Greeter3 {
////    stop() {
////        /*2*/var s = "hello\
////"/*1*/
////    }
////}

goTo.marker("1");
edit.insert("\r\n");
// We actually need to verify smart (virtual) indentation here rather than actual indentation. Fourslash support is required.
verify.indentationIs(8);
goTo.marker("2");
verify.currentLineContentIs("        var s = \"hello\\");