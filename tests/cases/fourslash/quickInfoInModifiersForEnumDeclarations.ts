/// <reference path='fourslash.ts' />

//// /*1*/enum A {};
////
//// /*2*/const /*3*/enum B {};
////
//// /*4*/export /*5*/enum C {};
////
//// /*6*/export /*7*/const /*8*/enum D {};
////
//// /*9*/export A;
////
//// /*10*/export /*11*/default A;

goTo.marker('1');
verify.quickInfoIs('enum A');

goTo.marker('2');
verify.quickInfoIs('const enum B');

goTo.marker('3');
verify.quickInfoIs('const enum B');

goTo.marker('4');
verify.quickInfoIs('enum C');

goTo.marker('5');
verify.quickInfoIs('enum C');

goTo.marker('6');
verify.quickInfoIs('const enum D');

goTo.marker('7');
verify.quickInfoIs('const enum D');

goTo.marker('8');
verify.quickInfoIs('const enum D');

goTo.marker('9');
verify.quickInfoIs('enum A');

goTo.marker('10');
verify.quickInfoIs('enum A');

goTo.marker('11');
verify.quickInfoIs('enum A');