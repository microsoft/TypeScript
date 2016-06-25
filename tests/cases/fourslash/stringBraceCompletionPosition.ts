/// <reference path="fourslash.ts" />

//// var x = "/*1*/";
//// var x = '/*2*/';
//// var x = "hello \
////     /*3*/";

goTo.marker('1');
verify.not.isValidBraceCompletionAtPosition('(');

goTo.marker('2');
verify.not.isValidBraceCompletionAtPosition('(');

goTo.marker('3');
verify.not.isValidBraceCompletionAtPosition('(');

