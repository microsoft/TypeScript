/// <reference path='fourslash.ts' />

////var v =
/////*1*/0 ? 1 :
/////*2*/2 ? 3 :
/////*3*/4;

format.document();
goTo.marker('1');
verify.indentationIs(4);
goTo.marker('2');
verify.indentationIs(4);
goTo.marker('3');
verify.indentationIs(4);
