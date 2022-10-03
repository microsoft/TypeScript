/// <reference path="fourslash.ts" />

//// var x = `/*1*/`;
//// var y = `hello /*2*/world, ${100}how /*3*/are you{ 200 } to/*4*/day!?`

goTo.marker('1');
verify.not.isValidBraceCompletionAtPosition('(');

goTo.marker('2');
verify.not.isValidBraceCompletionAtPosition('(');

goTo.marker('3');
verify.not.isValidBraceCompletionAtPosition('(');

goTo.marker('4');
verify.not.isValidBraceCompletionAtPosition('(');
