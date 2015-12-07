///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: myMod.js
//// module.exports = { n: 3, s: 'foo', b: true };

// @Filename: consumer.js
//// var x = require('./myMod');
//// x/**/;

goTo.file('consumer.js');
goTo.marker();
edit.insert('.');
verify.completionListContains("n", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
verify.completionListContains("s", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
verify.completionListContains("b", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
edit.insert('n.');
verify.completionListContains("toFixed", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
