/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////const /**/x = require("./b");

// @Filename: b.js
////exports.x = 0;

goTo.marker();
verify.quickInfoIs('const x: typeof "/tests/cases/fourslash/b"');
