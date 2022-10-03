/// <reference path="fourslash.ts" />

//// class D { }
//// D();

var funcDecl = 'declare function D();';

goTo.bof();
edit.insert(funcDecl);

goTo.bof();
edit.deleteAtCaret(funcDecl.length);
