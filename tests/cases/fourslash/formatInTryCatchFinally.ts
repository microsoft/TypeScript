/// <reference path='fourslash.ts' />

////try 
////{
////    var x = 1/*1*/
////}
////catch (e) 
////{
////}

goTo.marker("1");
edit.insert(";")
verify.currentLineContentIs("    var x = 1;");
