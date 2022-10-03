/// <reference path="fourslash.ts" />

//@Filename: file.tsx
//// declare var React: any;
////
//// var x = <div a="/*2*/" b={/*3*/}>
//// /*1*/
//// </div>;
//// var y = <div>/*4*/</div>
//// var z = <div>
////     hello /*5*/
//// </div>
//// var z2 = <div> { /*6*/
//// </div>
//// var z3 = <div>
////     {
//// /*7*/
//// }
//// </div>

goTo.marker('1');
verify.not.isValidBraceCompletionAtPosition('(');
verify.isValidBraceCompletionAtPosition('{');

goTo.marker('2');
verify.not.isValidBraceCompletionAtPosition('(');
verify.not.isValidBraceCompletionAtPosition('{');

goTo.marker('3');
verify.not.isValidBraceCompletionAtPosition('(');
verify.isValidBraceCompletionAtPosition('{');

goTo.marker('4');
verify.not.isValidBraceCompletionAtPosition('(');
verify.isValidBraceCompletionAtPosition('{');

goTo.marker('5');
verify.not.isValidBraceCompletionAtPosition('(');
verify.isValidBraceCompletionAtPosition('{');

goTo.marker('6');
verify.not.isValidBraceCompletionAtPosition('(');
verify.isValidBraceCompletionAtPosition('{');

goTo.marker('7');
verify.not.isValidBraceCompletionAtPosition('(');
verify.isValidBraceCompletionAtPosition('{');