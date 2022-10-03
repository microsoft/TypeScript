///<reference path="fourslash.ts" />

// @allowJs: true

// @Filename: node_modules/myMod/package.json
//// {"main": "entry.js"}


// @Filename: node_modules/myMod/entry.js
//// module.exports = { n: 3, s: 'foo', b: true };

// @Filename: consumer.js
//// var x = require('myMod');
//// x/**/;

goTo.file('consumer.js');
goTo.marker();
edit.insert('.');
verify.completions({
    unsorted: [
        ...["n", "s", "b"].map(name => ({ name, kind: "property" })),
        ...["x", "require"].map(name => ({ name, kind: "warning", sortText: completion.SortText.JavascriptIdentifiers })),
    ],
});
edit.insert('n.');
verify.completions({ includes: { name: "toFixed", kind: "method", kindModifiers: "declare" } });
