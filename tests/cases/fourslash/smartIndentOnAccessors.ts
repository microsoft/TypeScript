/// <reference path='fourslash.ts' />

////class Foo {
////    get foo(a,
////            /*1*/b,/*0*/
////                 //comment/*2*/
////        /*3*/c
////        ) {
////    }
////    set foo(a,
////            /*5*/b,/*4*/
////                 //comment/*6*/
////        /*7*/c
////        ) {
////    }
////}


goTo.marker("0");
edit.insert("\r\n");
verify.indentationIs(8);
goTo.marker("1");
verify.currentLineContentIs("        b,");
goTo.marker("2");
verify.currentLineContentIs("                 //comment");
goTo.marker("3");
verify.currentLineContentIs("        c");
goTo.marker("4");
edit.insert("\r\n");
verify.indentationIs(8);
goTo.marker("5");
verify.currentLineContentIs("        b,");
goTo.marker("6");
verify.currentLineContentIs("                 //comment");
goTo.marker("7");
verify.currentLineContentIs("        c");