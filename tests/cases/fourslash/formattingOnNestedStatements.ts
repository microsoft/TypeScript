/// <reference path='fourslash.ts' />

////{
/////*1*/{
/////*3*/test
////}/*2*/
////}
format.selection("1", "2");
goTo.marker("1");
verify.currentLineContentIs("    {");
goTo.marker("3");
verify.currentLineContentIs("        test");
goTo.marker("2");
verify.currentLineContentIs("    }");