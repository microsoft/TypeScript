///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
//// exports.x = 0;

// @Filename: consumer.js
//// var a = require(`./a`);
//// a./**/;

goTo.marker();
verify.completionListContains("x");
