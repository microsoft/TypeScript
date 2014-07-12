/// <reference path='fourslash.ts' />

////<(aa: number) =>void >(function myFn(b/**/b) { });

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker();
verify.quickInfoIs('any');