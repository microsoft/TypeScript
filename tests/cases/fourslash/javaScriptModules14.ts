///<reference path="fourslash.ts" />

// Assignments to 'exports.p' stop global variables from being visible in other files

// @allowJs: true
// @Filename: myMod.js
//// if (true) {
////     exports.b = true;
//// } else {
////     exports.n = 3;
//// }
//// function fn() {
////     exports.s = 'foo';
//// }
//// var invisible = true;

// @Filename: isGlobal.js
//// var y = 10;

// @Filename: consumer.js
//// var x = require('myMod');
//// /**/;

goTo.file('consumer.js');
goTo.marker();

verify.completionListContains('y');
verify.not.completionListContains('invisible');
