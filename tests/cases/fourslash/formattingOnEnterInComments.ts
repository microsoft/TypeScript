/// <reference path='fourslash.ts' />

////module me {
////    class A {
////        /*
////         */*1*/
////    /*2*/}
////}

goTo.marker("1");
edit.insertLine("");
goTo.marker("2");
// The formating of the close curly should not be affected
verify.currentLineContentIs('    }');
