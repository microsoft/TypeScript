/// <reference path='fourslash.ts' />

////var a;

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.eof();
verify.completionListContains("a");

edit.insertLine("");
verify.completionListContains("a");

edit.insertLine("");
verify.completionListContains("a");
