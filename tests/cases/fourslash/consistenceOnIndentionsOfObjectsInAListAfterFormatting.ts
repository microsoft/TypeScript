/// <reference path='fourslash.ts' />

////foo({
////}, {/*1*/
/////*2*/
////});/*3*/

////[{
////}, {/*a1*/
/////*a2*/
////}];/*a3*/

format.document();
goTo.marker("1");
verify.currentLineContentIs("}, {");
goTo.marker("2");
verify.indentationIs(4);
goTo.marker("3");
verify.currentLineContentIs("});");

goTo.marker("a1");
verify.currentLineContentIs("}, {");
goTo.marker("a2");
verify.indentationIs(4);
goTo.marker("a3");
verify.currentLineContentIs("}];");