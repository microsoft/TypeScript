/// <reference path="fourslash.ts" />

////// @Filename: exportEqualsInterface_A.ts
////interface A {
////    p1: number;
////}
////export = A;
/////**/
////var i: I1;
////var n: number = i.p1;

goTo.marker();
edit.insert('import I1 = require("exportEqualsInterface_A");');