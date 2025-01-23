// @module: node18,nodenext
// @rewriteRelativeImportExtensions: true
// @noTypesAndSymbols: true
// @verbatimModuleSyntax: true

// @Filename: foo.ts/index.ts
export = {};

// @Filename: index.ts
import foo = require("./foo.ts"); // Error
import type _foo = require("./foo.ts"); // Ok
