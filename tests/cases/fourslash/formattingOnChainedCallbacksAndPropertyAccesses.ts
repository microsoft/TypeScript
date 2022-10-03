/// <reference path='fourslash.ts'/>

////var x = 1;

////x
/////*1*/.toFixed

////x
/////*2*/.toFixed()

////x
/////*3*/.toFixed()
/////*4*/.length
/////*5*/.toString();

////x
/////*6*/.toFixed
/////*7*/.toString()
/////*8*/.length;

format.document();
goTo.marker('1');
verify.currentLineContentIs('    .toFixed');
goTo.marker('2');
verify.currentLineContentIs('    .toFixed()');
goTo.marker('3');
verify.currentLineContentIs('    .toFixed()');
goTo.marker('4');
verify.currentLineContentIs('    .length');
goTo.marker('5');
verify.currentLineContentIs('    .toString();');
goTo.marker('6');
verify.currentLineContentIs('    .toFixed');
goTo.marker('7');
verify.currentLineContentIs('    .toString()');
goTo.marker('8');
verify.currentLineContentIs('    .length;');
