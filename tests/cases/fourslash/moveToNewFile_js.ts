/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const { a, b } = require("./other");
////const p = 0;
////[|const y = p + b;
////const z = 0;
////exports.z = 0;|]
////a; y; z;

// @Filename: /user.ts
////const { x, y } = require("./a");

verify.moveToNewFile({
    newFileContents: {
        "/a.js":
// TODO: GH#22330
`const { y, z } = require("./y");

const { a, } = require("./other");
const p = 0;
exports.p = p;
a; y; z;`,

        "/y.js":
`const { b } = require("./other");
const { p } = require("./a");
const y = p + b;
exports.y = y;
const z = 0;
exports.z = 0;`,
    },
});
