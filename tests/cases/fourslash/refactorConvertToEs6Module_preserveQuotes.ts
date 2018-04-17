/// <reference path='fourslash.ts' />

// @allowJs: true
// @Filename: /a.js
////const a = require('a'); a;

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent: "import a from 'a'; a;",
});
