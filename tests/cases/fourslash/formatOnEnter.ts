/// <reference path="fourslash.ts"/>

////function listAPIFiles(path: string): string[] {
/////*1*/ /*11*/
/////*2*/    /*3*/
////}

edit.enableFormatting();
format.selection('1', '11');
goTo.marker('3');
verify.currentLineContentIs("    ");