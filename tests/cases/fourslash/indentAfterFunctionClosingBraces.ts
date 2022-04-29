/// <reference path="fourslash.ts"/>
////class foo {
////    public f() {
////        return 0;
////    /*1*/}/*2*/
////}

goTo.marker('2');
edit.insertLine("");
goTo.marker('1');
// Verify indentation level is correct after Format-on-Enter is called
verify.currentLineContentIs("    }");