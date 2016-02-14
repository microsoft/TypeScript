///<reference path="fourslash.ts" />

// @allowJs: true

// @Filename: node_modules/myMod/index.js
//// module.exports = { n: 3, s: 'foo', b: true };

// @Filename: consumer.js
//// import * as x from 'myMod';
//// x/**/;

goTo.file('consumer.js');
goTo.marker();
edit.insert('.');
// TODO: Bug: Fix ES6 import of assignments to module.exports
// verify.completionListContains("n", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
// verify.completionListContains("s", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
// verify.completionListContains("b", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
// edit.insert('n.');
// verify.completionListContains("toFixed", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
