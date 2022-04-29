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
verify.completions({ includes: ["n", "s", "b"].map(name => ({ name, kind: "property" })) });
edit.insert('n.');
verify.completions({ includes: { name: "toFixed", kind: "method", kindModifiers: "declare" } });
