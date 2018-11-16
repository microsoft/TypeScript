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
verify.completions({ includes: ["n", "s", "b"].map(name => ({ name, kind: "property" })) });;
edit.insert('n.');
verify.completions({ includes: { name: "toFixed", kind: "method", kindModifiers: "declare" } });
