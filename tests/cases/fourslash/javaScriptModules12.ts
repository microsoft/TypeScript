///<reference path="fourslash.ts" />

// Invocations of 'require' stop top-level variables from becoming global

// @allowJs: true

// @Filename: mod1.js
//// var x = require('fs');
//// /*1*/

// @Filename: mod2.js
//// var y;
//// if(true) {
////     y = require('fs');
//// } 
//// /*2*/

// @Filename: glob1.js
//// var a = require;
//// /*3*/

// @Filename: glob2.js
//// var b = '';
//// /*4*/

// @Filename: consumer.js
//// /*5*/

goTo.marker('1');
verify.completionListContains('x');
verify.not.completionListContains('y');
verify.completionListContains('a');
verify.completionListContains('b');

goTo.marker('2');
verify.not.completionListContains('x');
verify.completionListContains('y');
verify.completionListContains('a');
verify.completionListContains('b');

goTo.marker('3');
verify.not.completionListContains('x');
verify.not.completionListContains('y');
verify.completionListContains('a');
verify.completionListContains('b');

goTo.marker('4');
verify.not.completionListContains('x');
verify.not.completionListContains('y');
verify.completionListContains('a');
verify.completionListContains('b');

goTo.marker('5');
verify.not.completionListContains('x');
verify.not.completionListContains('y');
verify.completionListContains('a');
verify.completionListContains('b');
