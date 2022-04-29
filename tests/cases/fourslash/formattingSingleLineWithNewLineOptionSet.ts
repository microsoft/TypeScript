/// <reference path='fourslash.ts' />

/////*1*/module Default{}
/////*2*/function foo(){}
/////*3*/if (true){}
/////*4*/function boo() {
////}

format.setOption("PlaceOpenBraceOnNewLineForFunctions", true);
format.setOption("PlaceOpenBraceOnNewLineForControlBlocks", true);

format.document();

goTo.marker('1');
verify.currentLineContentIs('module Default { }');
goTo.marker('2');
verify.currentLineContentIs('function foo() { }');
goTo.marker('3');
verify.currentLineContentIs('if (true) { }');
goTo.marker('4');
verify.currentLineContentIs('function boo()');