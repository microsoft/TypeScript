/// <reference path='fourslash.ts' />

////{}

goTo.eof();
edit.insert("\r\n");
goTo.bof();
verify.currentLineContentIs("{ }");