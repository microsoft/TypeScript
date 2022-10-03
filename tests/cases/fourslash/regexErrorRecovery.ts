/// <reference path="fourslash.ts" />

//// // test code
//////var x = //**/a/;/*1*/
//////x.exec("bab");

//goTo.marker("");
//debug.printCurrentFileState();
//verify.quickInfoIs("RegExp");
//// Bug 579071: Parser no longer detects a Regex when an open bracket is inserted
edit.insert("(");
////verify.quickInfoIs("RegExp");
////verify.not.errorExistsAfterMarker("1");