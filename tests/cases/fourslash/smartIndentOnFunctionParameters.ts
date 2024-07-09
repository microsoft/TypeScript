/// <reference path='fourslash.ts' />

////function foo(a,
////        /*2*/b,/*0*/
////             //ABC/*3*/
////    /*4*/c
////    ) {
////};
////var x = [
////    /*5*///DEF/*1*/
////    1,/*6*/
////        2/*7*/
////]
goTo.marker("0");
edit.insert("\n");
verify.indentationIs(4);
goTo.marker("2");
verify.currentLineContentIs("    b,");
goTo.marker("3");
verify.currentLineContentIs("             //ABC");
goTo.marker("4");
verify.currentLineContentIs("    c");
goTo.marker("1");
edit.insert("\n");
verify.indentationIs(4);
goTo.marker("5");
verify.currentLineContentIs("    //DEF");
goTo.marker("6");
verify.currentLineContentIs("    1,");
goTo.marker("7");
verify.currentLineContentIs("        2");
