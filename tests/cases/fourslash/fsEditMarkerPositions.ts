/// <reference path='fourslash.ts' />

////var n = 'test';
////var p =     5    /*1*/
////var q = 'marker goes here ->(/*here*/right here)<-';

// Test that edits preserve marker positions later in the file
goTo.marker('1');
edit.insert(';');
goTo.marker('here');
verify.textAtCaretIs('right here');