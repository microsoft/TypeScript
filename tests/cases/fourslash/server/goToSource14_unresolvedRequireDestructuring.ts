/// <reference path="../fourslash.ts" />

// @allowJs: true

// @Filename: /home/src/workspaces/project/index.js
//// const { blah/**/ } = require("unresolved");

verify.baselineGoToSourceDefinition("");
