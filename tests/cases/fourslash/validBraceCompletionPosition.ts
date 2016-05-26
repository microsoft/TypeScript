/// <reference path="fourslash.ts" />

//// function parseInt(/*1*/){}
//// class aa/*2*/{
////   public b/*3*/(){}
//// }
//// interface I/*4*/{}
//// var x = /*5*/{ a:true }

goTo.marker('1');
verify.isValidBraceCompletionAtPostion('(');

goTo.marker('2');
verify.isValidBraceCompletionAtPostion('(');

goTo.marker('3');
verify.isValidBraceCompletionAtPostion('(');

goTo.marker('4');
verify.isValidBraceCompletionAtPostion('(');

goTo.marker('5');
verify.isValidBraceCompletionAtPostion('(');