///<reference path="fourslash.ts" />

// Assignments to 'module.exports' create an external module

// @allowJs: true
// @Filename: myMod.js
//// if (true) {
////     module.exports = { a: 10 };
//// }
//// var invisible = true;

// @Filename: isGlobal.js
//// var y = 10;

// @Filename: consumer.js
//// var x = require('./myMod');
//// /**/;

goTo.file('consumer.js');
goTo.marker();

verify.completions({ marker: "", includes: "y", excludes: "invisible" });

edit.insert('x.');
verify.completions({ includes: { name: "a", kind: "property" } });
edit.insert('a.');
verify.completions({ includes: { name: "toFixed", kind: "method", kindModifiers: "declare" } });
