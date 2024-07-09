/// <reference path='fourslash.ts' />

//// /*2*/const x = f('aa/*1*/a').x()

goTo.marker('1');
edit.paste("bb");
format.document();
goTo.marker('2');
verify.currentLineContentIs("const x = f('aabba').x()");
