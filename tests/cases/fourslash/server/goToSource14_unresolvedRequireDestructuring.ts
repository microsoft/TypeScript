/// <reference path="../fourslash.ts" />

// @lib: es5
// @allowJs: true

// @Filename: /home/src/workspaces/project/index.js
//// const { blah/**/ } = require("unresolved");

verify.baselineGoToSourceDefinition("");
