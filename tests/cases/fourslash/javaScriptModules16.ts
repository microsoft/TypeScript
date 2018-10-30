///<reference path="fourslash.ts" />

// Assignments to 'exports.p' define a property 'p'

// @allowJs: true
// @Filename: myMod.js
//// exports.n = 3;
//// exports.s = 'foo';
//// exports.b = true;

// @Filename: consumer.js
//// var x = require('./myMod');
//// x/**/;

goTo.file('consumer.js');
goTo.marker();
edit.insert('.');
verify.completions({
    exact: [
        ...["n", "s", "b"].map(name => ({ name, kind: "property" })),
        ...["x", "require"].map(name => ({ name, kind: "warning" })),
    ],
});
edit.insert('n.');
verify.completions({ includes: { name: "toFixed", kind: "method", kindModifiers: "declare" } });
