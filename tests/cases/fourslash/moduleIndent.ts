/// <reference path="fourslash.ts"/>
//// 

goTo.bof();
edit.insert("namespace M {\n");
// indentation on newline after "module {"
verify.indentationIs(4);
