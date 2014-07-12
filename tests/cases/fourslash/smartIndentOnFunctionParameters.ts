/// <reference path='fourslash.ts' />

////function foo(a,
////        /*2*/b,/*0*/
////             //comment/*3*/
////    /*4*/c
////    ) {
////};
////var x = [
////    /*5*///comment/*1*/
////    1,/*6*/
////        2/*7*/
////]
goTo.marker("0");
edit.insert("\r\n");
// bug 665652 - expected indentation: 13, actual indentation: 4
//verify.indentationIs(13);
verify.indentationIs(4);
goTo.marker("2");
// bug 665652 - expected result: "             b,", actual result: "    b,"
//verify.currentLineContentIs("             b,");
verify.currentLineContentIs("    b,");
goTo.marker("3");
verify.currentLineContentIs("             //comment");
goTo.marker("4");
// bug 665652 - expected result: "             c", actual result: "    c"
//verify.currentLineContentIs("             c");
verify.currentLineContentIs("    c");
goTo.marker("1");
edit.insert("\r\n");
// bug 665652 - expected indentation: 4, actual indentation: 0
//verify.indentationIs(4);
verify.indentationIs(0);
goTo.marker("5");
verify.currentLineContentIs("    //comment");
goTo.marker("6");
verify.currentLineContentIs("    1,");
goTo.marker("7");
// bug 665652 - expected result: "    2", actual result: "        2"
//verify.currentLineContentIs("    2");
verify.currentLineContentIs("        2");