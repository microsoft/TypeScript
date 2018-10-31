///<reference path="fourslash.ts" />

// Assignments to 'exports.p' define a property 'p' even if they're not at top-level

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

// @Filename: consumer.js
//// var x = require('./myMod');
//// x/**/;

goTo.file('consumer.js');
goTo.marker();
edit.insert('.');
verify.completions({ includes: ["s", "b", "n"].map(name => ({ name, kind: "property" })) });
edit.insert('n.');
verify.completions({ includes: { name: "toFixed", kind: "method", kindModifiers: "declare" } });
