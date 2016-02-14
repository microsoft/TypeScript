///<reference path="fourslash.ts" />

// @allowJs: true

// @Filename: node_modules/myMod/index.js
//// exports.n = 3;
//// exports.s = 'foo';
//// exports.b = true;

// @Filename: node_modules/anotherMod/index.js
//// exports.x = 3;
//// exports.y = 'foo';
//// exports.z = true;

// @Filename: consumer.js
//// import * as x from 'myMod';
//// import {y,z} from 'anotherMod';
//// x/**/;

goTo.file('consumer.js');
goTo.marker();
edit.insert('.');
verify.completionListContains("n", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
verify.completionListContains("s", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
verify.completionListContains("b", /*displayText:*/ undefined, /*documentation*/ undefined, "property");
edit.insert('n.');
verify.completionListContains("toFixed", /*displayText:*/ undefined, /*documentation*/ undefined, "method");

edit.backspace(4);
edit.insert('y.');
verify.completionListContains("toUpperCase", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
