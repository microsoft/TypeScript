///<reference path="fourslash.ts" />

// CommonJS modules should not pollute the global namespace

// @allowJs: true
// @Filename: myMod.js
//// var x = require('fs');

// @Filename: other.js
//// /**/;

verify.completions({ marker: "", excludes: "x" });
