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
//bug 718362 expected result : "        test" , actual result : "test"
//verify.currentLineContentIs("        test");
verify.currentLineContentIs("test");
goTo.marker("2");
//bug 718362 expected result : "    }" , actual result : "}"
//verify.currentLineContentIs("    }");
verify.currentLineContentIs("}");