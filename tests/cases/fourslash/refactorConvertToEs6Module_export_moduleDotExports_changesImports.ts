/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////*a*/module/*b*/.exports = 0;

// @Filename: /b.ts
////import a = require("./a");

// @Filename: /c.js
////const a = require("./a");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to ES6 module",
    actionName: "Convert to ES6 module",
    actionDescription: "Convert to ES6 module",
    newContent: `export default 0;`,
});

goTo.file("/b.ts");
verify.currentFileContentIs('import a from "./a";');

goTo.file("/c.js");
verify.currentFileContentIs('const a = require("./a").default;');
