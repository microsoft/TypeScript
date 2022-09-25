// If the module target is es2015+ and the file has no existing CommonJS
// indicators, use `import` declarations.

// @allowJs: true
// @checkJs: true
// @module: es2015

// @Filename: a.js
////export const x = 0;

// @Filename: index.js
////x

goTo.file("index.js");
verify.codeFix({
  index: 0,
  errorCode: ts.Diagnostics.Cannot_find_name_0.code,
  description: `Add import from "./a"`,
  applyChanges: false,
  newFileContent: 
`import { x } from "./a";

x`
});

// If the module target is es2015+ but the file already uses `require`
// (and not `import`), use `require`.
goTo.position(0);
edit.insertLine("const fs = require('fs');\n");
verify.codeFix({
  index: 0,
  errorCode: ts.Diagnostics.Cannot_find_name_0.code,
  description: `Add import from "./a"`,
  applyChanges: false,
  newFileContent: 
`const fs = require('fs');
const { x } = require('./a');

x`
});
