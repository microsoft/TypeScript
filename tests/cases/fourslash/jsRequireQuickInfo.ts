/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////const /**/x = require("./b");

// @Filename: b.js
////exports.x = 0;

verify.quickInfoAt("",'const x: typeof "/tests/cases/fourslash/b"');
