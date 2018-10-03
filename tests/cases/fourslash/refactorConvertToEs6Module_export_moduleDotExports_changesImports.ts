/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////module.exports = 0;

// @Filename: /b.ts
////import a = require("./a");

// @Filename: /c.js
////const a = require("./a");

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent: "export default 0;",
});

goTo.file("/b.ts");
verify.currentFileContentIs('import a from "./a";');

goTo.file("/c.js");
verify.currentFileContentIs('const a = require("./a").default;');
