/// <reference path="fourslash.ts"/>
//// 

goTo.bof();
edit.insert("interface Person {\n");
// indentation on newline after "interface {"
verify.indentationIs(4);
