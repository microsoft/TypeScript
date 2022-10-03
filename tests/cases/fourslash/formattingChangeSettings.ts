/// <reference path='fourslash.ts'/>

////module M {
/////*1*/var x=1;
////}

var originalOptions = format.copyFormatOptions();

format.document();

goTo.marker("1");
verify.currentLineContentIs("    var x = 1;");

var copy = format.copyFormatOptions();
copy.TabSize = 2;
copy.IndentSize = 2;

format.setFormatOptions(copy);
format.document();

goTo.marker("1");
verify.currentLineContentIs("  var x = 1;");

format.setFormatOptions(originalOptions);