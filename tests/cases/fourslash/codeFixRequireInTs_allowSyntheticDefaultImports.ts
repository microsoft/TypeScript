/// <reference path='fourslash.ts' />

// @allowSyntheticDefaultImports: true
// @Filename: /a.ts
////const a = [|require("a")|];

verify.codeFix({
    description: ts.Diagnostics.Convert_require_to_import.message,
    newFileContent: 'import a from "a";',
});
