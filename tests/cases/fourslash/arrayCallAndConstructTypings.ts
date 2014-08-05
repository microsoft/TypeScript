/// <reference path='fourslash.ts' />

////var a/*1*/1 = new Array();
////var a/*2*/2 = new Array(1);
////var a/*3*/3 = new Array<boolean>();
////var a/*4*/4 = new Array<boolean>(1);
////var a/*5*/5 = new Array("s");
////var a/*6*/6 = Array();
////var a/*7*/7 = Array(1);
////var a/*8*/8 = Array<boolean>();
////var a/*9*/9 = Array<boolean>(1);
////var a/*10*/10 = Array("s");


goTo.marker('1');
verify.quickInfoIs('any[]');

goTo.marker('2');
verify.quickInfoIs('any[]');

goTo.marker('3');
verify.quickInfoIs('boolean[]');

goTo.marker('4');
verify.quickInfoIs('boolean[]');

goTo.marker('5');
verify.quickInfoIs('string[]');

goTo.marker('6');
verify.quickInfoIs('any[]');

goTo.marker('7');
verify.quickInfoIs('any[]');

goTo.marker('8');
verify.quickInfoIs('boolean[]');

goTo.marker('9');
verify.quickInfoIs('boolean[]');

goTo.marker('10');
verify.quickInfoIs('string[]');