/// <reference path="fourslash.ts" />

//// /**
////  *  inside jsdoc /*1*/
////  */
//// function f() {
////     // inside regular comment /*2*/
////     var c = "";
////
////    /*3*//* inside /*4*/multi-
////       line comment /*5*/ 
////    */
////    var y =12;
//// }

goTo.marker('1');
verify.isValidBraceCompletionAtPosition('(');
verify.not.isValidBraceCompletionAtPosition('"');
verify.not.isValidBraceCompletionAtPosition(`'`);
verify.not.isValidBraceCompletionAtPosition('`');

goTo.marker('2');
verify.isValidBraceCompletionAtPosition('(');
verify.not.isValidBraceCompletionAtPosition('"');

goTo.marker('3');
verify.isValidBraceCompletionAtPosition('(');
verify.isValidBraceCompletionAtPosition('"');

goTo.marker('4');
verify.isValidBraceCompletionAtPosition('(');
verify.not.isValidBraceCompletionAtPosition('"');

goTo.marker('5');
verify.isValidBraceCompletionAtPosition('(');
verify.not.isValidBraceCompletionAtPosition('"');