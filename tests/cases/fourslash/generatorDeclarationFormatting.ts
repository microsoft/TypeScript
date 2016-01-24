/// <reference path="fourslash.ts"/>

//// function    *g() { }/*1*/
//// var v = function    *() { };/*2*/

format.document();
goTo.marker('1');
verify.currentLineContentIs("function* g() { }");
goTo.marker('2');
verify.currentLineContentIs("var v = function* () { };");