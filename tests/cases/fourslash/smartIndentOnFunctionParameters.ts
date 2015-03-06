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
verify.indentationIs(4);
goTo.marker("2");
verify.currentLineContentIs("    b,");
goTo.marker("3");
verify.currentLineContentIs("             //comment");
goTo.marker("4");
verify.currentLineContentIs("    c");
goTo.marker("1");
edit.insert("\r\n");
verify.indentationIs(4);
goTo.marker("5");
verify.currentLineContentIs("    //comment");
goTo.marker("6");
verify.currentLineContentIs("    1,");
goTo.marker("7");
verify.currentLineContentIs("        2");
