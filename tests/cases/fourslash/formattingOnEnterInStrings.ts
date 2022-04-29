/// <reference path='fourslash.ts' />

////var x = /*1*/"unclosed string literal\/*2*/

goTo.marker("2");
edit.insertLine("");
edit.insertLine("");
goTo.marker("1");
// Enter in open string literals should not affect formating
verify.currentLineContentIs('var x = "unclosed string literal\\');
