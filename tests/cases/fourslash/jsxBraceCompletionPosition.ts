/// <reference path="fourslash.ts" />

//@Filename: file.tsx
//// declare var React: any;
////
//// var x = <div a="/*2*/" b={/*3*/}>
//// /*1*/
//// </div>;

goTo.marker('1');
verify.not.isValidBraceCompletionAtPostion('(');
verify.isValidBraceCompletionAtPostion('{');

goTo.marker('2');
verify.not.isValidBraceCompletionAtPostion('(');

goTo.marker('3');
verify.not.isValidBraceCompletionAtPostion('(');

