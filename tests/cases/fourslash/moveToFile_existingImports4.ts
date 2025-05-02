/// <reference path='fourslash.ts' />

// @allowJs: true
// @module: commonjs
// @filename: /common.js
////export const x = 1;

// @filename: /a.js
////const { x } = require("./common");
////module.exports.a = x;
////[|module.exports.b = x;|]

// @filename: /b.js
////const { x } = require("./common");
////module.exports.a = x;

verify.moveToFile({
    newFileContents: {
        "/a.js":
`const { x } = require("./common");
module.exports.a = x;
`,
        "/b.js":
`const { x } = require("./common");
module.exports.a = x;
module.exports.b = x;
`,
    },
    interactiveRefactorArguments: { targetFile: "/b.js" },
});
