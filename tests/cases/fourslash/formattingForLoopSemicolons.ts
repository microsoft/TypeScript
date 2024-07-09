/// <reference path='fourslash.ts' />

/////*1*/for (;;) { }
/////*2*/for (var x;x<0;x++) { }
/////*3*/for (var x ;x<0 ;x++) { }

format.document();
goTo.marker('1');
verify.currentLineContentIs('for (; ;) { }');
goTo.marker('2');
verify.currentLineContentIs('for (var x; x < 0; x++) { }');
goTo.marker('3');
verify.currentLineContentIs('for (var x; x < 0; x++) { }');

format.setOption('InsertSpaceAfterSemicolonInForStatements', false);
format.document();
goTo.marker('1');
verify.currentLineContentIs('for (;;) { }');
goTo.marker('2');
verify.currentLineContentIs('for (var x;x < 0;x++) { }');
goTo.marker('3');
verify.currentLineContentIs('for (var x;x < 0;x++) { }');