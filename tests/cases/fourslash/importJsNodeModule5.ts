///<reference path="fourslash.ts" />

// @allowJs: true

// @Filename: node_modules/myMod/index.ts
//// var exp = { n: 3, s: 'foo', b: true };
//// export = exp;

// @Filename: consumer.js
//// import * as x from 'myMod';
//// x/**/;

goTo.file('consumer.js');
goTo.marker();
edit.insert('.');
verify.completionListContains("n", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
verify.completionListContains("s", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
verify.completionListContains("b", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
edit.insert('n.');
verify.completionListContains("toFixed", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
