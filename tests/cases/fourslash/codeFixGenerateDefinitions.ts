/// <reference path='fourslash.ts' />

// @Filename: /node_modules/foo/index.d.ts
////module.exports = 0;

// @Filename: /a.ts
////import * as foo from "foo";

verify.not.codeFixAvailable();
