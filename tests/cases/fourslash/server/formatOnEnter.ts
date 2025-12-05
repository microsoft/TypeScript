/// <reference path="../fourslash.ts"/>

/////*3*/function listAPIFiles (path : string): string[] {
////    /*1*/
////    /*2*/
////}

goTo.marker("1");
format.onType("1", "\n");
verify.currentLineContentIs("    ");

goTo.marker("2");
format.onType("2", "\n");
verify.currentLineContentIs("    ");

goTo.marker("3");
verify.currentLineContentIs("function listAPIFiles(path: string): string[] {");