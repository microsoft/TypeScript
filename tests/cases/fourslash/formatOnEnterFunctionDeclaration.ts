/// <reference path="fourslash.ts"/>

/////*0*/function listAPIFiles(path: string): string[] {/*1*/ }

goTo.marker("1");
edit.insertLine("");
goTo.marker("0");
verify.currentLineContentIs("function listAPIFiles(path: string): string[] {");