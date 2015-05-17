/// <reference path='fourslash.ts' />

//// /*1*/var varName: string;
//// /*2*/export /*3*/var varName: string;
////
//// /*4*/const varName: string;
//// /*5*/export /*6*/const constName: string;

goTo.marker('1');
verify.quickInfoIs('var varName: string');

goTo.marker('2');
verify.quickInfoIs('var varName: string');

goTo.marker('3');
verify.quickInfoIs('var varName: string');

goTo.marker('4');
verify.quickInfoIs('const varName: string');

goTo.marker('5');
verify.quickInfoIs('const constName: string');

goTo.marker('6');
verify.quickInfoIs('const constName: string');