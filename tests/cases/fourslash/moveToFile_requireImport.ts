/// <reference path='fourslash.ts' />

// @module: commonjs
// @allowJs: true

//@Filename: /bar.js
////const x = 0;

//@Filename: /a.js
////const { a, b } = require("./other");
////const p = 0;
////[|const y = p;
////const z = 0;
////exports.z = 0;|]
////a; y; z;

//@Filename: /other.js
////const a = 1;
////exports.a = a;

//@Filename: /user.ts
////const { x, y } = require("./a");

verify.moveToFile({
    newFileContents: {
        "/a.js":
`const { y, z } = require("./bar");
const { a, b } = require("./other");
const p = 0;
exports.p = p;
a; y; z;`,

        "/bar.js":
`const { p } = require("./a");

const x = 0;
const y = p;
exports.y = y;
const z = 0;
exports.z = 0;
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.js" }
});
