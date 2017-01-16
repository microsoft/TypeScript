/// <reference path="fourslash.ts" />

//// /**
////  *  inside jsdoc /*1*/
////  */
//// function f() {
////     // inside regular comment /*2*/
////     var c = "";
////
////    /* inside multi-
////       line comment /*3*/ 
////    */
////    var y =12;
//// }

goTo.marker('1');
verify.isValidBraceCompletionAtPosition('(');

goTo.marker('2');
verify.isValidBraceCompletionAtPosition('(');

goTo.marker('3');
verify.isValidBraceCompletionAtPosition('(');