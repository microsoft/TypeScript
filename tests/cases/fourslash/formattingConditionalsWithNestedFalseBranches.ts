/// <reference path='fourslash.ts' />

////var v =
/////*1*/0 ? 1 :
/////*2*/2 ? 3 :
/////*3*/4;

////var x =
/////*4*/a ? b :
/////*5*/c ? d :
/////*6*/e;

////var opacity =
/////*7*/depth == 0 ? 1 :
/////*8*/depth == 1 ? .7 :
/////*9*/depth == 2 ? .5 :
/////*10*/depth == 3 ? .4 : .3;

format.document();
goTo.marker('1');
verify.indentationIs(4);
goTo.marker('2');
verify.indentationIs(4);
goTo.marker('3');
verify.indentationIs(4);

format.document();
goTo.marker('4');
verify.indentationIs(4);
goTo.marker('5');
verify.indentationIs(4);
goTo.marker('6');
verify.indentationIs(4);

format.document();
goTo.marker('7');
verify.indentationIs(4);
goTo.marker('8');
verify.indentationIs(4);
goTo.marker('9');
verify.indentationIs(4);
goTo.marker('10');
verify.indentationIs(4);