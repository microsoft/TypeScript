/// <reference path="fourslash.ts" />

// @Target: ES5

// @Filename: file1.ts
//// [].splice(/*1*/
//// [].splice(2, 0, /*2*/

goTo.file("file1.ts");
verify.baselineSignatureHelp();