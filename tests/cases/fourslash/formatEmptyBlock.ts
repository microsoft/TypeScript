/// <reference path='fourslash.ts' />

////{}

goTo.eof();
edit.insert("\n");
goTo.bof();
verify.currentLineContentIs("{ }");