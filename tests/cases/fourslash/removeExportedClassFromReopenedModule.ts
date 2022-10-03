/// <reference path="fourslash.ts" />

//// module multiM { }
//// 
//// module multiM {
////     /*1*/export class c { }
//// }
//// 

goTo.marker('1');
edit.deleteAtCaret('export class c { }'.length);

goTo.eof();

edit.insert("new multiM.c();");
verify.numberOfErrorsInCurrentFile(1);
