/// <reference path='fourslash.ts' />

// @module: esnext
// @allowJs: true

// @Filename: /a.js
////[|const x = 0;|]
////exports.x = x;
// @Filename: /b.js
////const { x } = require("./a.js");
////
////x;

verify.moveToNewFile({
    newFileContents: {
        "/a.js":
`const { x } = require("./x");

exports.x = x;`,

        "/x.js":
`const x = 0;
exports.x = x;
`
    },
});
