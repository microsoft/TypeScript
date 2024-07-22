/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const foo = require(`foo`);

verify.codeFix({
    description: ts.Diagnostics.Convert_require_to_import.message,
    newFileContent: 'import foo = require("foo");',
});

