/// <reference path="fourslash.ts" />

//// /**/

goTo.marker();
var code = 'module B { }';
edit.paste(code);
goTo.bof();
edit.deleteAtCaret(code.length);

edit.insert('var t = (public x) => { };');
verify.numberOfErrorsInCurrentFile(1);
