///<reference path="fourslash.ts" />

// Assignments to 'module.exports' create an external module

// @allowJs: true
// @Filename: myMod.js
//// var x = { a: 10 };
//// module.exports = x;

// @Filename: isGlobal.js
//// var y = 10;

// @Filename: consumer.js
//// var x = require('./myMod');
//// /**/;

goTo.file('consumer.js');
goTo.marker();

verify.completionListContains('y');
verify.not.completionListContains('invisible');

edit.insert('x.');
verify.completionListContains('a', undefined, undefined, 'property');
edit.insert('a.');
verify.completionListContains('toFixed', undefined, undefined, 'method');
