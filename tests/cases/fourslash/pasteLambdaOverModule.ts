/// <reference path="fourslash.ts" />

// @strict: false
//// /**/

goTo.marker();
var code = 'namespace B { }';
edit.paste(code);
goTo.bof();
edit.deleteAtCaret(code.length);

edit.insert('var t = (public x) => { };');
verify.numberOfErrorsInCurrentFile(1);
