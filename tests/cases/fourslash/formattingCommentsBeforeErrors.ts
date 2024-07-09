/// <reference path='fourslash.ts' />

////module A {
////    interface B {
////        // a
////        // b
////        baz();
/////*0*/        // d /*1*/asd a
////        // e
////        foo();
////        // f asd
////        // g as
////        bar();
////    }
////}

goTo.marker("1");
edit.insert("\n");
goTo.marker("0");
verify.currentLineContentIs("        // d ");