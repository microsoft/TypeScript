/// <reference path="fourslash.ts" />

//// function parseInt(/*1*/){}
//// class aa/*2*/{
////   public b/*3*/(){}
//// }
//// interface I/*4*/{}
//// var x = /*5*/{ a:true }

goTo.marker('1');
verify.isValidBraceCompletionAtPosition('(');

goTo.marker('2');
verify.isValidBraceCompletionAtPosition('(');

goTo.marker('3');
verify.isValidBraceCompletionAtPosition('(');

goTo.marker('4');
verify.isValidBraceCompletionAtPosition('(');

goTo.marker('5');
verify.isValidBraceCompletionAtPosition('(');