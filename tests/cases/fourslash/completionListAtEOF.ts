/// <reference path='fourslash.ts' />

////var a;

goTo.eof();
verify.completionListContains("a");

edit.insertLine("");
verify.completionListContains("a");

edit.insertLine("");
verify.completionListContains("a");
