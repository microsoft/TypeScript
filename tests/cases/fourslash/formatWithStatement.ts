/// <reference path='fourslash.ts' />

////with /*1*/(foo.bar)
////
////   {/*2*/
////
////     }/*3*/
////
////with (bar.blah)/*4*/
////{/*5*/
////}/*6*/

format.setOption("PlaceOpenBraceOnNewLineForControlBlocks", false);
format.document();
goTo.marker("1");
verify.currentLineContentIs("with (foo.bar) {");
goTo.marker("3");
verify.currentLineContentIs("}");
goTo.marker("4");
verify.currentLineContentIs("with (bar.blah) {");
goTo.marker("6");
verify.currentLineContentIs("}");

format.setOption("PlaceOpenBraceOnNewLineForControlBlocks", true);
format.document();
goTo.marker("1");
verify.currentLineContentIs("with (foo.bar)");
goTo.marker("2");
verify.currentLineContentIs("{");
goTo.marker("4");
verify.currentLineContentIs("with (bar.blah)");
goTo.marker("5");
verify.currentLineContentIs("{");