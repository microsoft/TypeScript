/// <reference path='fourslash.ts' />

// @module: commonjs
// @esModuleInterop: false
// @allowSyntheticDefaultImports: false

// @Filename: /a.ts
////const foo = require(`foo`);

verify.codeFix({
    description: ts.Diagnostics.Convert_require_to_import.message,
    newFileContent: 'import foo = require("foo");',
});

