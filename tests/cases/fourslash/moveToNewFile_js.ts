/// <reference path='fourslash.ts' />

// @module: esnext
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
`const { a } = require("./other");
const { y, z } = require("./y");
const p = 0;
exports.p = p;
a; y; z;`,

        "/y.js":
`const { p } = require("./a");
const { b } = require("./other");

const y = p + b;
exports.y = y;
const z = 0;
exports.z = 0;
`,
    },
});
