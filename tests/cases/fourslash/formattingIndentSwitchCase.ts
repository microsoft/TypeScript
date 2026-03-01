/// <reference path='fourslash.ts'/>

////let foo = 1;
////switch (foo) {
/////*1*/case 0:
/////*2*/break;
/////*3*/default:
/////*4*/break;
////}

format.setOption('indentSwitchCase', true);
format.document();
goTo.marker('1');
verify.indentationIs(4);
goTo.marker('2');
verify.indentationIs(8);
goTo.marker('3');
verify.indentationIs(4);
goTo.marker('4');
verify.indentationIs(8);

format.setOption('indentSwitchCase', false);
format.document();
goTo.marker('1');
verify.indentationIs(0);
goTo.marker('2');
verify.indentationIs(4);
goTo.marker('3');
verify.indentationIs(0);
goTo.marker('4');
verify.indentationIs(4);
