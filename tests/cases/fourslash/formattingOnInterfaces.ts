/// <reference path='fourslash.ts' />

/////*1*/interface Blah 
////{
////}
format.document();
goTo.marker("1");
verify.currentLineContentIs("interface Blah {");