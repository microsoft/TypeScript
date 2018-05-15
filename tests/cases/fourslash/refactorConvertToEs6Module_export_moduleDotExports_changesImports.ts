/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////module.exports = 0;

// @Filename: /b.ts
////import a = require("./a");

// @Filename: /c.js
////const a = require("./a");

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent: {
        "/a.js": "export default 0;",
        "/b.ts": 'import a from "./a";',
        "/c.js": 'const a = require("./a").default;',
    }
});
