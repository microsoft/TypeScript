/// <reference path="fourslash.ts"/>

/////*3*/function listAPIFiles (path : string): string[] {/*1*//*2*/
////}

edit.enableFormatting();
goTo.marker("2");
edit.insert("    ");
goTo.marker("1");
edit.insert("\n")
verify.currentLineContentIs("    ");

goTo.marker("3");
verify.currentLineContentIs("function listAPIFiles(path: string): string[] {");