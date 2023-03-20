/// <reference path="../fourslash.ts" />

// @allowJs: true

// @Filename: /index.js
//// const { blah/**/ } = require("unresolved");

verify.goToSourceDefinition("", []);
