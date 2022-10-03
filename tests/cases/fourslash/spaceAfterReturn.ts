/// <reference path='fourslash.ts'/>

////function f( ) {
////return       1;/*1*/
////return[1];/*2*/
////return    ;/*3*/
////}

format.document();
goTo.marker("1");
verify.currentLineContentIs("    return 1;");
goTo.marker("2");
verify.currentLineContentIs("    return [1];");
goTo.marker("3");
verify.currentLineContentIs("    return;");